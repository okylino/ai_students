import { isAxiosError } from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import api from '@fishing_cat/api';
import { LessonSeat } from '@fishing_cat/api/models/lesson/lessonSeat';
import { postCreateQuizResult } from '@fishing_cat/api/services/quizService';
import { postCreateTaskResult } from '@fishing_cat/api/services/taskService';
import CustomButton from '@fishing_cat/components/customButton';
import LoginOptionDialog from '@fishing_cat/components/dialog/loginOptionDialog/LoginOptionDialog';
import Seat from '@fishing_cat/components/pages/join/seat/Seat';
import StudentName from '@fishing_cat/components/pages/join/studentName/StudentName';
import ReconnectHint from '@fishing_cat/components/prototypes/reconnectHint';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { PointToastContext } from '@fishing_cat/context/pointToastContext/PointToastContext';
import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import UserContext from '@fishing_cat/context/userContext/UserContext';
import { ATTENDANT_STATUS } from '@fishing_cat/enums/attendantStatus';
import { JOIN_REASON, REMOVE_USER_ID_REASON } from '@fishing_cat/enums/mixpanelReason';
import { SEAT_TYPE } from '@fishing_cat/enums/seatType';
import { toastType } from '@fishing_cat/enums/toastType';
import useGetLesson from '@fishing_cat/hooks/useGetLesson';
import useSocketEventListener from '@fishing_cat/hooks/useSocketEventListener';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import MixpanelClient from '@fishing_cat/libs/MixpanelClient';
import * as $ from '@fishing_cat/pages/join/join.style';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { sendJoinToMixpanel, sendRemoveUserIdEventToMixpanel } from '@fishing_cat/services/mixpanelService';
import SentryService from '@fishing_cat/services/sentryService';
import { ChooseSeatMessage, ReleaseSeatMessage, StudentPointsMessage } from '@fishing_cat/socket/models/lesson';
import getStudentInfoAndNavigate from '@fishing_cat/utils/authUtils';
import Logger from '@fishing_cat/utils/Logger';
import { getUserIdByLessonId, removeUserIdByLessonId, setUserIdWithLessonId } from '@fishing_cat/utils/userIdUtils';
import { ROUTE_PATH } from '@/enums/routePath';

const COMPONENT_NAME = 'Join';

const Join = () => {
  const location = useLocation();
  const unsetNameStudent = location.state?.unsetNameStudent;
  const [seatNumber, setSeatNumber] = useState('');
  const [selectedSeat, setSelectedSeat] = useState({});
  const [isEnterDisplayName, setIsEnterDisplayName] = useState(false);
  const { login, logout } = useContext(UserContext);
  const { lessonId } = useContext(LessonContext);
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const seatRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoveStudent, setIsRemoveStudent] = useState(false);
  const { updatePointList, setPoints } = useContext(PointToastContext);
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.userStore.user);
  const [seats, setSeats] = useState<LessonSeat[]>([]);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const { joinLesson, socket, isConnected } = useSocketContext();
  const hasChecked = useRef(false);

  useGetLesson({ componentName: COMPONENT_NAME });

  // listen student join lesson and disable button
  const onChooseSeat = (msg: ChooseSeatMessage) => {
    if (!msg?.serial_number) return;
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.serial_number === msg.serial_number ? { ...seat, status: ATTENDANT_STATUS.ACTIVE } : seat,
      ),
    );
  };

  // listen student leave lesson and release button
  const onReleaseSeat = (msg: ReleaseSeatMessage) => {
    if (!msg?.serial_number) return;
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.serial_number === msg.serial_number ? { ...seat, status: ATTENDANT_STATUS.INACTIVE } : seat,
      ),
    );
  };

  // Student was kicked out of the classroom
  const onRemoveStudent = useCallback(() => {
    logout();
    sendRemoveUserIdEventToMixpanel({
      lessonId,
      component: COMPONENT_NAME,
      reason: REMOVE_USER_ID_REASON.ON_REMOVE_STUDENT,
    });
    SentryService.captureRemoveUserId({
      lessonId,
      componentName: COMPONENT_NAME,
      reason: REMOVE_USER_ID_REASON.ON_REMOVE_STUDENT,
    });
    removeUserIdByLessonId({ lessonId, isForce: true });

    localStorage.removeItem('accessToken');
    setIsEnterDisplayName(false);
    setIsRemoveStudent(true);
    setTimeout(() => {
      setIsRemoveStudent(false);
    }, 3000);
  }, [lessonId, logout]);

  // Student was given points or deducted points
  const onStudentPoints = (msg: StudentPointsMessage) => {
    updatePointList(msg.type);
    setPoints(msg.total_points);
  };

  useSocketEventListener('choose_seat', onChooseSeat);
  useSocketEventListener('release_seat', onReleaseSeat);
  useSocketEventListener('remove_student', onRemoveStudent);
  useSocketEventListener('student_points', onStudentPoints);

  if (!isEnterDisplayName && unsetNameStudent) {
    setSeatNumber(unsetNameStudent.seatNumber);
    setSelectedSeat({ serialNumber: unsetNameStudent.serialNumber });
    setIsEnterDisplayName(true);
  }

  // remove student from teacher
  useEffect(() => {
    const isRemove = location?.state?.isRemove;
    if (isRemove) setIsRemoveStudent(isRemove);

    const timer = setTimeout(() => {
      setIsRemoveStudent(false);
    }, 3000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // get exist student info when online
  useEffect(() => {
    const handleOnline = () => {
      checkStudentAlreadyHasSeatAndAutoChoose();
    };

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [lessonId, loginUser]);

  // click previous in enter name page
  useEffect(() => {
    if (!isEnterDisplayName && lessonId) {
      setSelectedSeat({});
      getRoomStudent();
    }
  }, [isEnterDisplayName, lessonId]);

  // get exist student info
  useEffect(() => {
    if (!lessonId || !isConnected) return;
    // Due to an error when navigating from the classroom page, hasRemovedUserId will be true
    if (!hasChecked.current && !location.state?.hasRemovedUserId) {
      checkStudentAlreadyHasSeatAndAutoChoose();
      hasChecked.current = true;
    }
    // eslint-disable-next-line
  }, [lessonId, isConnected, location.state?.hasRemovedUserId]);

  useEffect(() => {
    if (isRemoveStudent) {
      dispatch(
        openToastWithMessage({
          message: t('removedFromClass'),
          type: toastType.WARNING,
        }),
      );
    }
  }, [isRemoveStudent]);

  const handleRejoinSeat = async (roomId, lessonId) => {
    try {
      const seat = await api.student.rejoinSeat({
        serial_number: Number(queryParams.get('serialNumber')),
        lesson_id: lessonId,
        sid: socket.id,
        user_id: queryParams.get('userId'),
      });
      await saveStudentInfo(seat);
      navigate(`/classroom?roomId=${roomId}&lessonId=${lessonId}`);
    } catch {
      await api.student.releaseSeat({ lesson_id: lessonId, student_id: queryParams.get('userId') });
      logout();
      sendRemoveUserIdEventToMixpanel({
        lessonId,
        component: COMPONENT_NAME,
        reason: REMOVE_USER_ID_REASON.REJOIN_SEAT_API_ERROR,
      });
      SentryService.captureRemoveUserId({
        lessonId,
        componentName: COMPONENT_NAME,
        reason: REMOVE_USER_ID_REASON.REJOIN_SEAT_API_ERROR,
      });
      removeUserIdByLessonId({ lessonId, isForce: true });

      localStorage.removeItem('accessToken');
    } finally {
      window.history.replaceState({}, '', `/join?roomId=${roomId}`);
    }
  };

  const checkStudentAlreadyHasSeatAndAutoChoose = async () => {
    const userId = getUserIdByLessonId({ lessonId });
    if (!userId) return;

    const seat = await getStudentInfoAndNavigate(
      navigate,
      login,
      logout,
      joinLesson,
      lessonId,
      loginUser?.email,
      socket.id,
      userId,
      COMPONENT_NAME,
      true,
    );

    if (seat?.serial_number) {
      if (loginUser?.userId && queryParams.get('serialNumber')) {
        // 登入時會帶 serialNumber 給 oidcService.sign，oidc 導回來時會帶在 url
        // 判斷如果是從 oidc 導回來時要 releaseSeat
        await api.student.releaseSeat({ lesson_id: lessonId, student_id: queryParams.get('userId') });
        sendRemoveUserIdEventToMixpanel({
          lessonId,
          component: COMPONENT_NAME,
          reason: REMOVE_USER_ID_REASON.LOGIN_AFTER_CHOSEN_SEAT,
        });
        SentryService.captureRemoveUserId({
          lessonId,
          componentName: COMPONENT_NAME,
          reason: REMOVE_USER_ID_REASON.LOGIN_AFTER_CHOSEN_SEAT,
        });
        removeUserIdByLessonId({ lessonId, isForce: true });
      }

      setSelectedSeat({ serialNumber: seat.serial_number, type: SEAT_TYPE.A });
      handleChooseSeat(seat.serial_number);
    } else if (queryParams.get('serialNumber')) {
      // for typeC -> typeA, 選typeC座位進教室後才登入又沒有預排座位的話要回到原座位
      handleRejoinSeat(roomId, lessonId);
      window.history.replaceState({}, '', `/join?roomId=${roomId}`);
    }
  };

  // get room student count and student list
  const getRoomStudent = async () => {
    const lessonSeat = await api.lesson.lessonSeat({ lesson_id: lessonId });
    setSeats(
      lessonSeat.sort((a, b) => {
        if (!a.seat_number && !a.display_name && !a.email) return 1;
        if (!b.seat_number && !b.display_name && !b.email) return -1;
        return 0;
      }),
    );
  };

  const checkSeatExist = async () => {
    const userId = getUserIdByLessonId({ lessonId });

    if (!userId) return false;
    try {
      const seat = await api.student.getStudentSeat({ lesson_id: lessonId, student_id: userId });
      if (!seat.is_joined) return false;
      return seat;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      sendRemoveUserIdEventToMixpanel({
        lessonId,
        component: COMPONENT_NAME,
        reason: REMOVE_USER_ID_REASON.GET_STUDENT_SEAT_API_ERROR,
      });
      SentryService.captureRemoveUserId({
        lessonId,
        componentName: COMPONENT_NAME,
        reason: REMOVE_USER_ID_REASON.GET_STUDENT_SEAT_API_ERROR,
        apiError: isAxiosError(error) ? error : undefined,
      });
      removeUserIdByLessonId({ lessonId });
      return false;
    }
  };

  const handleExistingSeat = (seat) => {
    const { display_name: displayName, seat_number: selectedSeatNumber, serial_number: serialNumber } = seat;
    if (displayName) {
      const userId = getUserIdByLessonId({ lessonId });

      login(displayName, userId, selectedSeatNumber, serialNumber);
      navigate(`/classroom?roomId=${roomId}&lessonId=${lessonId}`);
    } else {
      setSeatNumber(selectedSeatNumber);
      setSelectedSeat({ serialNumber });
      setIsEnterDisplayName(true);
    }
  };

  const handleChooseSeat = async (serialNumber = null, force = false) => {
    const seat = await checkSeatExist();
    if (seat) {
      MixpanelClient.setSeatNumber(Number(seat.seat_number));
      handleExistingSeat(seat);
      return;
    }

    if (!force && selectedSeat.type === SEAT_TYPE.B) {
      setIsLoginModal(true);
      return;
    }
    setIsLoading(true);
    try {
      const seat = await api.student.chooseSeat({
        serial_number: serialNumber || selectedSeat.serialNumber,
        lesson_id: lessonId,
        sid: socket.id,
        user_id: loginUser?.userId ? loginUser.userId : '',
        device_id: window.localStorage.getItem('deviceId'),
      });
      MixpanelClient.setSeatNumber(serialNumber || selectedSeat.serialNumber);
      await saveStudentInfo(seat);
      if (seat.display_name) {
        navigate(`/classroom?roomId=${roomId}&lessonId=${lessonId}`);
      }
    } catch (e) {
      dispatch(
        openToastWithMessage({
          message: e.response?.status === 409 ? t('toastNumberSelected') : t('toastWrong'),
          type: toastType.WARNING,
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveStudentInfo = async (seat) => {
    const { student_id, seat_number, socket_token, display_name, serial_number } = seat;
    setSeatNumber(seat_number);
    localStorage.setItem('accessToken', socket_token);

    const userId = getUserIdByLessonId({ lessonId });

    if (!userId) setUserIdWithLessonId({ userId: student_id, lessonId });

    Logger.identifyUser(userId || student_id);
    MixpanelClient.setIsLogin(!!loginUser.userId);

    try {
      await postCreateTaskResult({ lessonId, studentId: student_id });
      await postCreateQuizResult({ lessonId, studentId: student_id });
    } catch (e) {
      console.log(e);
    }

    login(display_name, student_id, seat_number, serial_number);
    sendJoinToMixpanel('by_student', lessonId, JOIN_REASON.SAVE_STUDENT_INFO);
    if (display_name) {
      await api.student.putStudentName({ lesson_id: lessonId, student_id, display_name });
    } else {
      setIsEnterDisplayName(true);
    }
  };

  const handlePreviousStep = () => {
    navigate(loginUser?.userId ? ROUTE_PATH.MY_CLASS : `/?roomId=${roomId}`);
  };

  return (
    <>
      {isEnterDisplayName ? (
        <>
          <$.Body>
            <StudentName
              serialNumber={selectedSeat.serialNumber}
              setIsEnterDisplayName={setIsEnterDisplayName}
              seatNumber={seatNumber}
            />
          </$.Body>
          <LegalAndVersionInfo />
        </>
      ) : (
        <>
          <$.Wrapper>
            <$.Body>
              <$.Title>{t('selectNumber')}</$.Title>
              <$.SeatWrapper ref={seatRef}>
                {seats.map((seat) => (
                  <Seat
                    key={seat.serial_number}
                    type={seat.user_type}
                    seatNumber={seat.seat_number}
                    serialNumber={seat.serial_number}
                    displayName={seat.display_name}
                    selectedSeat={selectedSeat}
                    status={seat.status}
                    setSelectedSeat={setSelectedSeat}
                  />
                ))}
              </$.SeatWrapper>
            </$.Body>
            <LegalAndVersionInfo />
          </$.Wrapper>

          <$.ButtonWrapper>
            <CustomButton onClick={handlePreviousStep} width='180px' outlined>
              {t('previousStep')}
            </CustomButton>
            <CustomButton
              onClick={() => handleChooseSeat()}
              disabled={!selectedSeat?.serialNumber || isLoading}
              width='180px'
            >
              {t('confirm')}
            </CustomButton>
          </$.ButtonWrapper>
        </>
      )}

      <ReconnectHint />
      <LoginOptionDialog
        isOpen={isLoginModal}
        setIsOpen={setIsLoginModal}
        onGuestJoin={() => {
          handleChooseSeat(undefined, true);
          setIsLoginModal(false);
        }}
      />
    </>
  );
};

export default Join;
