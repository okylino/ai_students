import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '@fishing_cat/api';
import { isQuizResponseData, QuizResponseData } from '@fishing_cat/api/models/lesson/quiz';
import { TaskResp } from '@fishing_cat/api/models/lesson/task';
import { getQuiz, getTask, getTool } from '@fishing_cat/api/services/lessonService';
import PickingDialog from '@fishing_cat/components/dialog/pickingDialog/PickingDialog';
import style from '@fishing_cat/components/pages/classroom/classroom.module.css';
import ClassStatus from '@fishing_cat/components/pages/classroom/classStatus';
import Quiz from '@fishing_cat/components/pages/classroom/quiz/Quiz';
import RefreshQuestion from '@fishing_cat/components/pages/classroom/RefreshQuestion';
import Response from '@fishing_cat/components/pages/classroom/response/Response';
import { TaskDetails } from '@fishing_cat/components/pages/classroom/response/ResponseTask.type';
import Race from '@fishing_cat/components/pages/classroom/tool/Race';
import ReconnectHint from '@fishing_cat/components/prototypes/reconnectHint';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { PointToastContext } from '@fishing_cat/context/pointToastContext/PointToastContext';
import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import TaskContext from '@fishing_cat/context/taskContext/TaskContext';
import UserContext from '@fishing_cat/context/userContext/UserContext';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import { JOIN_REASON, LEAVE_REASON, REMOVE_USER_ID_REASON } from '@fishing_cat/enums/mixpanelReason';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';
import { RACE_STATUS } from '@fishing_cat/enums/raceStatus';
import { TASK_STATUS } from '@fishing_cat/enums/taskStatus';
import useGetLesson from '@fishing_cat/hooks/useGetLesson';
import useSocketEventListener from '@fishing_cat/hooks/useSocketEventListener';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import MixpanelClient from '@fishing_cat/libs/MixpanelClient';
import * as $ from '@fishing_cat/pages/classroom/Classroom.style';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { resetTextTranslation } from '@fishing_cat/redux/slices/translationSlice';
import {
  sendEndLessonEventToMixpanel,
  sendFocusToMixpanel,
  sendJoinToMixpanel,
  sendLeaveToMixpanel,
  sendRemoveUserIdEventToMixpanel,
  sendUnfocusToMixpanel,
} from '@fishing_cat/services/mixpanelService';
import SentryService from '@fishing_cat/services/sentryService';
import { StudentPointsMessage } from '@fishing_cat/socket/models/lesson';
import { CreateQuizMessage, FinishQuizMessage, QuizCallback } from '@fishing_cat/socket/models/quiz';
import { TaskCallback, TaskCreatedMessage, TaskMarkingMessage } from '@fishing_cat/socket/models/task';
import getStudentInfoAndNavigate from '@fishing_cat/utils/authUtils';
import { isEmptyObject } from '@fishing_cat/utils/formatUtils';
import { removeLocalStorage } from '@fishing_cat/utils/lessonUtils';
import { getUserIdByLessonId, removeUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';
import { QUIZ_TYPE } from '@/enums/quiz';
import { TASK_TYPE } from '@/enums/task';

import { QuizData } from './Classroom.type';

const initialQuizData: QuizData = {
  isOpen: false,
  imgUrl: '',
  type: QUIZ_TYPE.TRUE_FALSE,
  id: '',
  title: '',
  studentAnswer: [],
  status: QUIZ_STATUS.OPEN,
  optionList: [],
  optionType: '',
  sourceType: '',
};

const COMPONENT_NAME = 'Classroom';

const Classroom = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const [quizData, setQuizData] = useState<QuizData>(initialQuizData);
  const [inClass, setInClass] = useState(true);
  const [isPickUp, setIsPickUp] = useState(false);
  const [isRace, setIsRace] = useState(false);
  const { setTask } = useContext(TaskContext);
  const { login, logout } = useContext(UserContext);
  const { setLessonStatus, lessonId, lessonStatus, setLessonId } = useContext(LessonContext);
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updatePointList, setPoints } = useContext(PointToastContext);
  const [roomName, setRoomName] = useState('');
  const [markingTaskMsg, setMarkingTaskMsg] = useState<TaskMarkingMessage>();
  const dispatch = useAppDispatch();
  const [isOnEndLesson, setIsOnEndLesson] = useState(false);
  const loginUser = useAppSelector((state) => state.userStore.user);
  const { joinLesson, socket, isConnected } = useSocketContext();
  const { hasGottenLesson } = useGetLesson({ componentName: COMPONENT_NAME });

  const userId = getUserIdByLessonId({ lessonId });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendJoinToMixpanel('by_student', lessonId, JOIN_REASON.VISIBILITY_CHANGE);
      } else {
        sendLeaveToMixpanel('by_student', lessonId, LEAVE_REASON.VISIBILITY_CHANGE);
      }
    };
    dispatch(
      openToastWithMessage({
        message: t('toastJoinedClass'),
      }),
    );
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, lessonId, t]);

  const resetQuizState = () => {
    setQuizData(initialQuizData);
  };

  const openQuiz = (data: CreateQuizMessage | QuizResponseData) => {
    const optionList = data.option_list.sort((a, b) => a.option_id - b.option_id);

    const quizData: QuizData = {
      ...initialQuizData,
      isOpen: true,
      imgUrl: data.img_url,
      type: data.quiz_type,
      id: data.quiz_id,
      title: data.content,
      optionList,
      optionType: data.option_type,
      sourceType: data.source_type,
    };

    if (isQuizResponseData(data)) {
      quizData.studentAnswer = data.student_answer ?? [];
      quizData.status = data.quiz_status;
    }

    setQuizData(quizData);
  };

  const onEndLesson = () => {
    sendLeaveToMixpanel('by_teacher', lessonId, LEAVE_REASON.END_LESSON);
    sendEndLessonEventToMixpanel();
    setLessonStatus(LESSON_STATUS.POST_CLASS);

    // if is login user, will reset lessonId in ReviewDialog
    if (!loginUser?.accessToken) {
      setLessonId('');
    }
    setIsOnEndLesson(true);
    removeLocalStorage({ lessonId, componentName: COMPONENT_NAME });
    // close quiz and task
    resetQuizState();
    setTask([]);
    setResponse(false);
  };

  const onRemoveStudent = () => {
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
    navigate(`/join?roomId=${roomId}`, { state: { isRemove: true } });
  };

  const onStudentPoints = (msg: StudentPointsMessage) => {
    updatePointList(msg.type);
    setPoints(msg.total_points);
  };

  const onStartLesson = () => {
    setLessonStatus(LESSON_STATUS.IN_CLASS);
  };
  const onCreateQuiz = (msg: CreateQuizMessage, callback: (params: QuizCallback) => void) => {
    openQuiz(msg);
    if (userId && socket.id) callback({ student_id: userId, sid: socket.id });
  };

  const onFinishQuiz = (msg: FinishQuizMessage, callback: (params: QuizCallback) => void) => {
    if (msg.quiz_status === QUIZ_STATUS.CANCEL) {
      resetQuizState();
    } else {
      setQuizData((prev) => ({ ...prev, status: QUIZ_STATUS.FINISH }));
    }
    if (userId && socket.id) callback({ student_id: userId, sid: socket.id });
  };

  const onCancelQuiz = (_: object, callback: (params: QuizCallback) => void) => {
    resetQuizState();
    dispatch(resetTextTranslation());

    if (userId && socket.id) callback({ student_id: userId, sid: socket.id });
  };

  const onStartRace = () => {
    setIsRace(true);
  };

  const onSelectStudent = () => {
    setIsPickUp(true);
  };

  const openTask = (data: TaskCreatedMessage) => {
    setTask((prevTasks) => {
      const taskIdExists = prevTasks.some((taskItem) => taskItem.id === data.task_id);
      if (taskIdExists) return prevTasks;

      const newTask: TaskDetails = {
        id: data.task_id,
        originImg: data.img_url ?? '',
        createdAt: data.created_at,
        status: TASK_STATUS.UNSUBMITTED,
        link: data.link_url ?? '',
        linkMeta: data.link_meta,
        type: data.task_type,
        version: 1,
        studentImg: '',
        studentFile: '',
        teacherImg: '',
        linkIsOpen: false,
      };
      const newTaskList = [newTask, ...prevTasks];
      return newTaskList;
    });
    setResponse(true);
    setQuizData((prev) => ({ ...prev, isOpen: false }));
  };

  const onCreateTask = async (msg: TaskCreatedMessage, callback: (params: TaskCallback) => void) => {
    openTask(msg);
    if (userId && socket.id) callback({ student_id: userId, sid: socket.id });
  };

  const markingTask = (data: TaskMarkingMessage) => {
    setTask((prevTasks: TaskDetails[]) => {
      const taskId = data.task_id;
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            teacherImg: data.img_url,
            status: TASK_STATUS.GRADED,
            version: data.version,
          };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const initTask = (data: TaskResp) => {
    const openTasks = data.map((obj) => {
      const openTask: TaskDetails = {
        id: obj.task_id,
        createdAt: obj.created_at,
        status: obj.trigger_type,
        version: obj.version,
        type: obj.img_url ? TASK_TYPE.SCREENSHOT : TASK_TYPE.LINK,
        originImg: '',
        teacherImg: '',
        studentImg: '',
        studentFile: '',
        link: '',
        linkIsOpen: false,
      };

      if (obj.img_url) {
        openTask.originImg = obj.img_url;
        openTask.teacherImg = obj.teacher_img_url;
        openTask.studentImg = obj.student_img_url;
        openTask.studentFile = obj.student_img_url;
      } else {
        openTask.link = obj.link_url;
        openTask.linkMeta = obj.link_meta;
        openTask.linkIsOpen = obj.is_opened;
      }

      return openTask;
    });
    setTask(openTasks);
    setResponse(true);
    resetQuizState();
  };

  const getOpenedQuiz = async () => {
    if (!userId) return;
    try {
      const quizData = await getQuiz({ lessonId, studentId: userId });

      if (quizData.quiz_id && quizData.quiz_status !== QUIZ_STATUS.CANCEL) {
        openQuiz(quizData);
      }

      if (isEmptyObject(quizData)) {
        // has lesson and student, but no quiz now
        resetQuizState();
      }
    } catch {}
  };

  const getOpenedTool = async () => {
    const toolData = await getTool({ lessonId });
    const raceStatus = toolData.race_status;
    if (raceStatus === RACE_STATUS.OPEN) {
      onStartRace();
    }
  };

  const onMarkingTask = (msg: TaskMarkingMessage) => {
    markingTask(msg);
    setMarkingTaskMsg(msg);
  };

  const getOpenedTask = async () => {
    if (!userId) return;
    const taskData = await getTask({ lessonId, studentId: userId });
    if (taskData && taskData.length > 0) {
      initTask(taskData);
    } else {
      setTask([]);
      setResponse(false);
    }
  };

  useSocketEventListener('end_lesson', onEndLesson);
  useSocketEventListener('remove_student', onRemoveStudent);
  useSocketEventListener('student_points', onStudentPoints);
  useSocketEventListener('start_lesson', onStartLesson);
  useSocketEventListener('create_quiz', onCreateQuiz);
  useSocketEventListener('finish_quiz', onFinishQuiz);
  useSocketEventListener('close_quiz', onCancelQuiz);
  useSocketEventListener('start_race', onStartRace);
  useSocketEventListener('select_student', onSelectStudent);
  useSocketEventListener('task_created', onCreateTask);
  useSocketEventListener('task_marking', onMarkingTask);

  useEffect(() => {
    const getRoomInfo = async () => {
      if (!roomId) return;
      const room = await api.room.getRoomInfo({ roomId });
      MixpanelClient.registerRoomName(room.display_name);
      SentryService.roomName = room.display_name;
      setRoomName(room.display_name);
    };

    getRoomInfo();
  }, [roomId]);

  useEffect(() => {
    if (hasGottenLesson && isConnected && lessonId && lessonStatus !== LESSON_STATUS.POST_CLASS) {
      const studentId = userId || loginUser?.userId;
      if (!studentId) {
        navigate(`/join?${searchParams}`, { replace: true });
        return;
      }
      const getOpenedQuizAndTask = async () => {
        await getOpenedTask();
        await getOpenedQuiz();
      };
      getOpenedQuizAndTask();
      getOpenedTool();
      getStudentInfoAndNavigate(
        navigate,
        login,
        logout,
        joinLesson,
        lessonId,
        loginUser?.email,
        socket.id,
        studentId,
        COMPONENT_NAME,
      );
    }
    // eslint-disable-next-line
  }, [isConnected, lessonId, loginUser, lessonStatus, hasGottenLesson, userId]);

  useEffect(() => {
    const handleFocusChange = () => {
      if (document.hasFocus()) {
        sendFocusToMixpanel(lessonId);
      } else {
        sendUnfocusToMixpanel(lessonId);
      }
    };
    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    return () => {
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
    };
  }, [lessonId]);

  useEffect(() => {
    if (!response && !quizData.isOpen) {
      setInClass(true);
    } else if (response) {
      setInClass(false);
    } else if (quizData.isOpen) {
      setInClass(false);
    }
  }, [response, quizData.isOpen]);

  return (
    <>
      <$.Wrapper>
        <$.Body $hasResponse={Boolean(response)}>
          <$.RoomNameWrapper>
            <p className={`${style.room_name}`}>{roomName}</p>
            <RefreshQuestion getOpenedTask={getOpenedTask} getOpenedQuiz={getOpenedQuiz} />
          </$.RoomNameWrapper>

          {quizData.isOpen && <Quiz quiz={quizData} />}
          <Race isRace={isRace} setIsRace={setIsRace} />
          {response && <Response setResponse={setResponse} markingTask={markingTask} markingTaskMsg={markingTaskMsg} />}

          <ReconnectHint />
          {inClass && <ClassStatus isOnEndLesson={isOnEndLesson} setIsOnEndLesson={setIsOnEndLesson} />}
        </$.Body>
        <LegalAndVersionInfo />
      </$.Wrapper>
      <PickingDialog isOpen={isPickUp} setIsOpen={setIsPickUp} />
    </>
  );
};

export default Classroom;
