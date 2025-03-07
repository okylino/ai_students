import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { postUpdateTaskResult } from '@fishing_cat/api/services/taskService';
import ArrowDownFilledIcon from '@fishing_cat/assets/svgr/icons/arrow-down-filled.svg';
import style from '@fishing_cat/components/pages/classroom/response/response.module.css';
import { HistoryProps, ResponseProps } from '@fishing_cat/components/pages/classroom/response/Response.type';
import ResponseHistory from '@fishing_cat/components/pages/classroom/response/ResponseHistory';
import Task from '@fishing_cat/components/pages/classroom/response/ResponseTask';
import { ResponseTask, TaskDetails } from '@fishing_cat/components/pages/classroom/response/ResponseTask.type';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import TaskContext from '@fishing_cat/context/taskContext/TaskContext';
import { TASK_STATUS } from '@fishing_cat/enums/taskStatus';
import { TASK_TYPE } from '@fishing_cat/enums/taskType';
import useSocketEventListener from '@fishing_cat/hooks/useSocketEventListener';
import { TaskCallback, TaskClosedMessage } from '@fishing_cat/socket/models/task';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

const Response = ({ setResponse, markingTask, markingTaskMsg }: ResponseProps) => {
  const { task, setTask } = useContext(TaskContext);
  const [currentTaskId, setCurrentTaskId] = useState(task[0]?.id || '');
  const currentTask = task.find((tasks: TaskDetails) => tasks.id === currentTaskId) || {};

  const { lessonId } = useContext(LessonContext);
  const [responseTask, setResponseTask] = useState<ResponseTask>({});
  const [closeTaskMsg, setCloseTaskMsg] = useState({});
  const [isTaskSending, setIsTaskSending] = useState(false);
  const { socket } = useSocketContext();

  const userId = getUserIdByLessonId({ lessonId });

  useEffect(() => {
    if (task.length === 0) setResponse(false);
  }, [task, setResponse]);

  const closeTask = (data: TaskClosedMessage) => {
    const taskId = data.task_id;
    const index = task.findIndex((tasks: TaskDetails) => tasks.id === taskId);

    if (index === -1) return;
    setTask((prev: TaskDetails[]) => prev.filter((item: TaskDetails) => item.id !== taskId));
    setCloseTaskMsg({ msg: data, currentTaskId });
  };

  const onCloseTask = (msg: TaskClosedMessage, callback: (params: TaskCallback) => void) => {
    closeTask(msg);
    if (userId && socket.id) callback({ student_id: userId, sid: socket.id });
  };

  useSocketEventListener('task_closed', onCloseTask);

  useEffect(() => {
    if (responseTask.taskId) {
      const taskToUpdate = task.find((tasks) => tasks.id === responseTask.taskId);
      if (!taskToUpdate) return;
      if (responseTask.imgData) {
        if (taskToUpdate.status === TASK_STATUS.GRADED) {
          // response version 2 or N
          taskToUpdate.originImg = taskToUpdate.teacherImg;
          taskToUpdate.teacherImg = '';
        } else if (taskToUpdate.version !== 1) {
          // response version 1
          taskToUpdate.originImg = taskToUpdate.teacherImg;
        }
        taskToUpdate.status = TASK_STATUS.RESPONSE;
        taskToUpdate.studentImg = responseTask.getImgUrl;
        taskToUpdate.studentFile = responseTask.imgData;
        taskToUpdate.version = responseTask.version;
      } else {
        taskToUpdate.linkIsOpen = true;
      }
      setTask([...task]);
      setResponseTask({});
      setIsTaskSending(false);
    }
    // eslint-disable-next-line
  }, [task, responseTask]);

  const handleClickLink = async () => {
    if (currentTask.link && userId) {
      window.open(currentTask.link, '_blank');
      setResponseTask({ taskId: currentTask.id });
      await postUpdateTaskResult({
        taskId: currentTask.id,
        body: [{ student_id: userId, task_type: TASK_TYPE.LINK }],
      });
      const responseTaskData = {
        lesson_id: lessonId,
        student_id: userId,
        task_id: currentTask.id,
      };
      socket.emit('response_task', responseTaskData);
    }
  };

  return (
    <>
      <div className={style.center}>
        <Task
          handleClickLink={handleClickLink}
          setResponseTask={setResponseTask}
          markingTask={markingTask}
          markingTaskMsg={markingTaskMsg}
          closeTaskMsg={closeTaskMsg}
          isTaskSending={isTaskSending}
          setIsTaskSending={setIsTaskSending}
          setCloseTaskMsg={setCloseTaskMsg}
          currentTaskId={currentTaskId}
          setCurrentTaskId={setCurrentTaskId}
          currentTask={currentTask}
        />
      </div>

      <History task={task} />
    </>
  );
};

const History = ({ task }: HistoryProps) => {
  const { t } = useTranslation();

  return (
    <div className={`${style.history}`}>
      <p className={style.history_title}>
        {t('HistoryTitle')}
        <ArrowDownFilledIcon style={{ width: '24px', height: '18px' }} />
      </p>
      <div className={style.history_header}>
        <div>{t('fieldReceivedTasks')}</div>
        <div />
        <div>{t('fieldMyAnswers')}</div>
        <div>{t('fieldResult')}</div>
      </div>
      {task
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((taskItem) => (
          <ResponseHistory task={taskItem} key={taskItem.id} />
        ))}
    </div>
  );
};

export default Response;
