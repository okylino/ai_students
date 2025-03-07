import { useContext, useEffect, useRef, useState } from 'react';

import api from '@fishing_cat/api';
import BuzzerDialog from '@fishing_cat/components/dialog/buzzerDialog/BuzzerDialog';
import { RaceProps } from '@fishing_cat/components/pages/classroom/tool/Race.type';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { BUZZER_RESULT } from '@fishing_cat/enums/buzzerResult';
import { BUZZER_STATUS } from '@fishing_cat/enums/buzzerStatus';
import useSocketEventListener from '@fishing_cat/hooks/useSocketEventListener';
import { studentAnsweredMessage } from '@fishing_cat/socket/models/tool';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

const Race = ({ setIsRace, isRace }: RaceProps) => {
  const [status, setStatus] = useState(BUZZER_STATUS.START);
  const { lessonId } = useContext(LessonContext);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [successNumber, setSuccessNumber] = useState('');

  const userId = getUserIdByLessonId({ lessonId });

  const createRaceTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    return setTimeout(() => {
      setIsRace(false);
    }, 10000);
  };

  const onStudentAnswered = (msg?: studentAnsweredMessage) => {
    setIsLoading(false);
    if (!msg) return;
    if (msg.student_id !== userId) {
      setSuccessNumber(msg.seat_number ?? '');
      setStatus(BUZZER_STATUS.FAIL);
      timeoutRef.current = createRaceTimeout();
    } else if (msg.student_id === userId) {
      setStatus(BUZZER_STATUS.SUCCESS);
      timeoutRef.current = createRaceTimeout();
    }
  };

  const onEndRace = () => {
    setIsRace(false);
  };

  useSocketEventListener('student_answered', onStudentAnswered);
  useSocketEventListener('end_race', onEndRace);

  useEffect(() => {
    if (isRace) {
      setStatus(BUZZER_STATUS.START);
      setIsLoading(false);
      clearTimeout(timeoutRef.current);
    }
  }, [isRace]);

  const handleRace = async () => {
    if (isLoading || !userId) return;
    setIsLoading(true);
    try {
      const res = await api.tools.postBuzzer({ lessonId, userId });
      const { message, data } = res;
      if (message === BUZZER_RESULT.SUCCESS) {
        setStatus(BUZZER_STATUS.SUCCESS);
        timeoutRef.current = createRaceTimeout();
      } else if (message === BUZZER_RESULT.FAIL) {
        onStudentAnswered({ student_id: data.student_id, seat_number: data.race_student_seat_number });
      }
    } catch {}

    setIsLoading(false);
  };

  const handleCloseRaceModal = () => {
    clearTimeout(timeoutRef.current);
    setIsRace(false);
  };

  return (
    <BuzzerDialog
      isOpen={isRace}
      onClose={handleCloseRaceModal}
      status={status}
      successNumber={successNumber}
      onBuzzer={handleRace}
    />
  );
};

export default Race;
