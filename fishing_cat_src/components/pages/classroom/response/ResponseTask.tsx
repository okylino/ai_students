import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

import { postPresignedUrl } from '@fishing_cat/api/services/lessonService';
import { postUpdateTaskResult } from '@fishing_cat/api/services/taskService';
import { postConvertImg } from '@fishing_cat/api/services/toolsService';
import CanvasIcon from '@fishing_cat/assets/svgr/icons/canvas-plus.svg';
import LeftArrowIcon from '@fishing_cat/assets/svgr/icons/caret-left-small.svg';
import RightArrowIcon from '@fishing_cat/assets/svgr/icons/caret-right-small.svg';
import CheckFilledIcon from '@fishing_cat/assets/svgr/icons/check-circle-filled.svg';
import CloseIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import PlaneRightIcon from '@fishing_cat/assets/svgr/icons/paper-plane-right.svg';
import PenIcon from '@fishing_cat/assets/svgr/icons/pen-outlined.svg';
import PictureIcon from '@fishing_cat/assets/svgr/icons/picture-outlined.svg';
import TrashIcon from '@fishing_cat/assets/svgr/icons/trash.svg';
import CustomCircularProgress from '@fishing_cat/components/circularProgress/CustomCircularProgress';
import ChangeTaskDialog from '@fishing_cat/components/dialog/changeTaskDialog/ChangeTaskDialog';
import DeleteTaskDraftDialog from '@fishing_cat/components/dialog/deleteTaskDraftDialog/DeleteTaskDraftDialog';
import SendTaskErrorDialog from '@fishing_cat/components/dialog/sendTaskErrorDialog/SendTaskErrorDialog';
import UploadImgErrorDialog from '@fishing_cat/components/dialog/uploadImgErrorDialog/UploadImgErrorDialog';
import {
  ActionBtnProps,
  PaginationProps,
  ResponseTaskProps,
  SubmitBtnProps,
  TaskDetails,
  WrongToastProps,
} from '@fishing_cat/components/pages/classroom/response/ResponseTask.type';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import TaskContext from '@fishing_cat/context/taskContext/TaskContext';
import { IMG_TYPE } from '@fishing_cat/enums/imgType';
import { PRESIGNED_URL } from '@fishing_cat/enums/presignedUrlType';
import { TASK_RESULT_TYPE } from '@fishing_cat/enums/taskResultType';
import { TASK_STATUS } from '@fishing_cat/enums/taskStatus';
import { TASK_TYPE } from '@fishing_cat/enums/taskType';
import COLOR from '@fishing_cat/styles/color';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';
import SpinnerBorder from '@/components/prototypes/SpinnerBorder';

import Link from './Link';
import style from './response.module.css';
import { ErrorIcon } from './response.style';
import Whiteboard from './Whiteboard';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    padding: '0',
    border: 'none',
    borderRadius: '0',
  },
};

const Task = ({
  currentTask,
  handleClickLink,
  setResponseTask,
  markingTask,
  markingTaskMsg,
  closeTaskMsg,
  isTaskSending,
  setIsTaskSending,
  setCloseTaskMsg,
  setCurrentTaskId,
  currentTaskId,
}: ResponseTaskProps) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { lessonId } = useContext(LessonContext);
  const { task } = useContext(TaskContext);
  const openTaskCount = task.length;
  const [whiteboardType, setWhiteboardType] = useState('');
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isUploadSomeError, setIsUploadSomeError] = useState(false);
  const [taskStatus, setTaskStatus] = useState(currentTask.status);
  const [previewImg, setPreviewImg] = useState('');
  const [isNewMark, setIsNewMark] = useState(false);
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [isUploadStart, setIsUploadStart] = useState(false);
  const [isActionDisabled, setIsActionDisabled] = useState(false);
  const [isSendErrorOpen, setIsSendErrorOpen] = useState(false);
  const [isUploadErrorOpen, setIsUploadErrorOpen] = useState(false);
  const [isChangeTaskOpen, setIsChangeTaskOpen] = useState(false);
  const [isDeleteDraftOpen, setIsDeleteDraftOpen] = useState(false);
  const [editImgData, setEditImgData] = useState({});
  const fileNameRef = useRef('');
  const switchDirectionRef = useRef('');
  const currentTaskIndex = task.findIndex((tasks: TaskDetails) => tasks.id === currentTaskId);

  const userId = getUserIdByLessonId({ lessonId });

  useEffect(() => {
    if (isTaskSending) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Perform actions before the component unloads
        event.preventDefault();
        event.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isTaskSending]);

  useEffect(() => {
    setIsActionDisabled(isUploadStart || isTaskSending);
  }, [isUploadStart, isTaskSending]);

  useEffect(() => {
    if (!currentTask) return;
    switch (currentTask.status) {
      case TASK_STATUS.GRADED:
        setPreviewImg(currentTask.teacherImg);
        setTaskStatus(TASK_STATUS.GRADED);
        break;
      case TASK_STATUS.RESPONSE:
        setPreviewImg(currentTask.studentImg);
        break;
      default:
        setPreviewImg(currentTask.originImg);
        break;
    }
  }, [task, currentTask]);

  useEffect(() => {
    if (!editImgData.data) {
      setTaskStatus(currentTask.status);
    }
  }, [currentTask]);

  useEffect(() => {
    if (editImgData.taskId === currentTask.id) {
      setTaskStatus(TASK_STATUS.EDITING);
    }
    // 學生上傳同時老師關閉派送需要回到正確的狀態顯示
    if (!editImgData?.taskId) setTaskStatus(currentTask.status);
  }, [editImgData, currentTask?.status]);

  useEffect(() => {
    // teacher marked again when student editing
    // clear student edit content and change img
    if (taskStatus === TASK_STATUS.EDITING && markingTaskMsg.task_id === currentTask.id) {
      console.log('teacher marked again', markingTaskMsg);
      setTaskStatus(TASK_STATUS.GRADED);
      setIsNewMark(true);
      setEditImgData({});
      setTimeout(() => {
        setIsNewMark(false);
      }, 3000);
    }
  }, [markingTaskMsg]);

  useEffect(() => {
    const closeTaskId = closeTaskMsg?.msg?.task_id;
    const currentTaskIdOnClose = closeTaskMsg?.currentTaskId;

    if (closeTaskId) {
      if (currentTaskIdOnClose === closeTaskId) {
        // if teacher close current task, clear draft and close whiteboard
        setEditImgData({});
        setIsTaskSending(false);
        setResponseTask({});
        closeWhiteboard();
      }

      setCurrentTaskId(task[0]?.id || '');
      setCloseTaskMsg({});
    }
  }, [closeTaskMsg, setCloseTaskMsg, setIsTaskSending, setResponseTask, task, setCurrentTaskId]);

  const openWhiteboard = (type) => {
    if (isActionDisabled) return;
    setIsWhiteboardOpen(true);
    setWhiteboardType(type);
  };

  const closeWhiteboard = () => {
    setIsWhiteboardOpen(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploadStart(true);
    setIsUploadDone(false);
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const allowedTypes = [IMG_TYPE.JPEG, IMG_TYPE.PNG, IMG_TYPE.HEIF, IMG_TYPE.HEIC];
      const maxSize = 25 * 1024 * 1024;
      const fileSize = file.size;

      if (allowedTypes.includes(fileType) && fileSize < maxSize) {
        try {
          const { base64 } = await postConvertImg(file);
          setEditImgData({ taskId: currentTask.id, data: base64 });
          event.target.value = '';
        } catch (e: any) {
          if (e.response?.status === 400) {
            openImgFormatErrorModal(file);
            event.target.value = '';
            setIsUploadDone(true);
            return;
          }

          if (e.response?.status !== 200) {
            setIsUploadSomeError(true);
            setTimeout(() => {
              setIsUploadSomeError(false);
            }, 3000);
            event.target.value = '';
          }
        }
      } else {
        openImgFormatErrorModal(file);
        event.target.value = '';
      }
    }
    setIsUploadDone(true);
    setTimeout(() => {
      setIsUploadStart(false);
    }, 100);
  };

  const openImgFormatErrorModal = (file: File) => {
    fileNameRef.current = file.name;
    setIsUploadErrorOpen(true);
  };

  const handleChangeTask = (action: string, force = false) => {
    if (taskStatus === TASK_STATUS.EDITING && !force) {
      switchDirectionRef.current = action;
      setIsChangeTaskOpen(true);
      return;
    }

    setEditImgData({});
    inputRef.current.value = '';
    if (action === 'next') {
      const nextIndex = Math.min(currentTaskIndex + 1, task.length - 1);
      setCurrentTaskId(task[nextIndex].id);
    } else {
      const prevIndex = Math.max(currentTaskIndex - 1, 0);
      setCurrentTaskId(task[prevIndex].id);
    }
  };

  const responseTask = async () => {
    if (isActionDisabled) return;
    setIsTaskSending(true);
    try {
      const url = await postPresignedUrl({ lessonId, type: PRESIGNED_URL.IMG });
      await uploadImg(url, editImgData.data);
    } catch (e) {
      setIsSendErrorOpen(true);
    }
  };

  const convertBase64ToBlob = (data: string) => {
    const binaryString = window.atob(data.split(',')[1]);
    const { length } = binaryString;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < length; i += 1) {
      view[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: 'image/png' });
    return blob;
  };

  const uploadImg = async (url: { put: string; get: string }, imgData: string) => {
    const putImgUrl = url.put;
    const getImgUrl = url.get;
    const blob = convertBase64ToBlob(imgData);
    const taskId = currentTask.id;
    await fetch(putImgUrl, { body: blob, method: 'put' }).then(() => {
      updateTaskAndEmit(taskId, getImgUrl, imgData);
    });
  };

  const updateTaskAndEmit = async (taskId: string, getImgUrl: string, imgData: string) => {
    const version = currentTask.version === 1 ? 1 : currentTask.version + 1;
    if (userId)
      try {
        const { data } = await postUpdateTaskResult({
          taskId,
          body: [
            {
              student_id: userId,
              task_type: TASK_TYPE.SCREENSHOT,
              img_url: getImgUrl,
              task_result_type: TASK_RESULT_TYPE.RESPONSE,
              version,
            },
          ],
        });
        if (data.success[0]) {
          setResponseTask({ imgData, getImgUrl, taskId, version });
          setTaskStatus(TASK_STATUS.RESPONSE);
          setPreviewImg(getImgUrl);
          setEditImgData({});
        } else {
          setTaskStatus(TASK_STATUS.GRADED);
          markingTask({
            task_id: data.failed[0].task_id,
            img_url: data.failed[0].img_url,
            version: data.failed[0].version,
          });
          setIsNewMark(true);
          setTimeout(() => {
            setIsNewMark(false);
          }, 3000);
        }
      } catch (e) {
        setIsSendErrorOpen(true);
      }
  };

  const handleDeleteCheck = () => {
    if (isActionDisabled) return;
    setIsDeleteDraftOpen(true);
  };

  const handleDeleteResponse = () => {
    inputRef.current.value = '';
    setEditImgData({});
    setTaskStatus(currentTask.status);
  };

  const taskStatusTextMap: { [key in TASK_STATUS]: string } = {
    [TASK_STATUS.UNSUBMITTED]: t('stateNoResponse'),
    [TASK_STATUS.EDITING]: t('taskStatusEditing'),
    [TASK_STATUS.RESPONSE]: t('stateAnswered'),
    [TASK_STATUS.GRADED]: t('taskStatusMarked'),
  };

  const getTaskStatusText = () => taskStatusTextMap[taskStatus] || undefined;

  return (
    <>
      <Pagination
        currentTaskIndex={currentTaskIndex}
        openTaskCount={openTaskCount}
        handleChangeTask={handleChangeTask}
        isActionDisabled={isActionDisabled}
      />
      <div className={style.border} onClick={handleClickLink} role='button' onKeyUp={handleClickLink} tabIndex={0}>
        <div className={style.task_header}>
          {currentTask.type !== 'LINK' && (
            <>
              <p>{getTaskStatusText()}</p>
              <div>
                {(taskStatus == TASK_STATUS.UNSUBMITTED || taskStatus == TASK_STATUS.GRADED) && (
                  <>
                    <ActionBtn
                      iconImg={
                        <PictureIcon
                          style={{
                            color: isActionDisabled ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000],
                          }}
                        />
                      }
                      text={t('uploadImage')}
                      onClick={() => {
                        inputRef.current.click();
                      }}
                      disabled={isActionDisabled}
                    />
                    <ActionBtn
                      iconImg={
                        <CanvasIcon
                          style={{
                            color: isActionDisabled ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000],
                          }}
                        />
                      }
                      text={t('newCanvasBtn')}
                      onClick={() => openWhiteboard('new')}
                      disabled={isActionDisabled}
                    />
                  </>
                )}

                {taskStatus !== TASK_STATUS.RESPONSE && (
                  <ActionBtn
                    iconImg={
                      <PenIcon
                        style={{
                          color: isActionDisabled ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000],
                        }}
                      />
                    }
                    text={t('editContent')}
                    onClick={() => openWhiteboard('edit')}
                    disabled={isActionDisabled}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {isUploadStart && (
          <>
            <div className={style.loading_bg} />
            <div className={style.circular_progress}>
              <CustomCircularProgress start={isUploadStart} done={isUploadDone} />
            </div>
          </>
        )}

        {currentTask.type === 'LINK' ? (
          <>
            <Link size='original' metadata={currentTask?.linkMeta} url={currentTask.link} />
            <button className={style.link_button} type='button'>
              {t('submitOpen')}
            </button>
          </>
        ) : (
          <img
            src={editImgData.taskId === currentTask.id ? editImgData.data : previewImg}
            className={style.img}
            alt='task_img'
          />
        )}

        {taskStatus === TASK_STATUS.EDITING && (
          <div
            className={`${style.delete_icon} ${isTaskSending ? style.disabled : ''}`}
            onClick={handleDeleteCheck}
            role='button'
            onKeyUp={handleDeleteCheck}
            tabIndex={0}
            aria-label='delete_task'
          >
            <TrashIcon style={{ width: '22px', color: isTaskSending ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000] }} />
          </div>
        )}
      </div>

      {currentTask.type !== 'LINK' && (
        <SubmitBtn taskStatus={taskStatus} responseTask={responseTask} isTaskSending={isTaskSending} />
      )}

      <input
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputRef}
        accept='image/jpeg, image/png, image/heic, image/heif'
        disabled={isActionDisabled}
      />

      <Modal isOpen={isWhiteboardOpen} style={customStyles} ariaHideApp={false}>
        <Whiteboard
          closeWhiteboard={closeWhiteboard}
          img={previewImg}
          whiteboardType={whiteboardType}
          setEditImgData={setEditImgData}
          editImgData={editImgData}
          taskId={currentTask.id}
          task={task}
        />
      </Modal>

      {isUploadSomeError && <WrongToast msg={t('toastWrong')} handleClose={() => setIsUploadSomeError(false)} />}
      {isNewMark && <WrongToast msg={t('toastNewMark')} handleClose={() => setIsNewMark(false)} />}

      <ChangeTaskDialog
        isOpen={isChangeTaskOpen}
        setIsOpen={setIsChangeTaskOpen}
        onChangeTask={() => {
          handleChangeTask(switchDirectionRef.current, true);
          setIsChangeTaskOpen(false);
        }}
      />
      <DeleteTaskDraftDialog
        isOpen={isDeleteDraftOpen}
        setIsOpen={setIsDeleteDraftOpen}
        onDeleteTaskDraft={() => {
          handleDeleteResponse();
          setIsDeleteDraftOpen(false);
        }}
      />
      <SendTaskErrorDialog
        isOpen={isSendErrorOpen}
        onClose={() => {
          setIsSendErrorOpen(false);
          setIsTaskSending(false);
        }}
      />
      <UploadImgErrorDialog
        isOpen={isUploadErrorOpen}
        setIsOpen={setIsUploadErrorOpen}
        fileName={fileNameRef.current}
      />
    </>
  );
};

const WrongToast = ({ msg, handleClose }: WrongToastProps) => (
  <div className={`error ${style.toast}`}>
    <div>
      <ErrorIcon />
      {msg}
    </div>
    <CloseIcon onClick={handleClose} className={style.close} />
  </div>
);

const SubmitBtn = ({ taskStatus, responseTask, isTaskSending }: SubmitBtnProps) => {
  const { t } = useTranslation();
  const buttonContent = () => {
    if (isTaskSending) {
      return <SpinnerBorder />;
    }

    if (taskStatus === TASK_STATUS.GRADED || taskStatus === TASK_STATUS.RESPONSE) {
      return (
        <>
          <CheckFilledIcon style={{ color: COLOR.GREEN[500] }} />
          <span>{taskStatus === TASK_STATUS.GRADED ? t('taskStatusMarked') : t('stateAnswered')}</span>
        </>
      );
    }

    return (
      <>
        <PlaneRightIcon style={{ width: '22px', marginInlineEnd: '6px' }} />
        <span>{t('sendBtn')}</span>
      </>
    );
  };

  return (
    <button
      className={
        taskStatus === TASK_STATUS.GRADED || taskStatus === TASK_STATUS.RESPONSE
          ? `${style.send_btn} ${style.green}`
          : style.send_btn
      }
      disabled={taskStatus !== TASK_STATUS.EDITING}
      onClick={responseTask}
      type='button'
    >
      {buttonContent()}
    </button>
  );
};

const ActionBtn = ({ iconImg, text, onClick, disabled }: ActionBtnProps) => (
  <div
    onClick={onClick}
    className={disabled ? style.action_disabled : undefined}
    onKeyUp={onClick}
    tabIndex={0}
    role='button'
  >
    {iconImg}
    <p className={style.action_text}>{text}</p>
  </div>
);

const Pagination = ({ currentTaskIndex, openTaskCount, handleChangeTask, isActionDisabled }: PaginationProps) => {
  const returnDisable = isActionDisabled || currentTaskIndex + 1 <= 1;
  const nextDisabled = isActionDisabled || currentTaskIndex + 1 >= openTaskCount;

  return (
    <div className={style.pagination}>
      <button
        onClick={() => handleChangeTask('prev')}
        disabled={returnDisable}
        className={returnDisable ? style.disabled : ''}
        type='button'
        aria-label='return_icon'
      >
        <LeftArrowIcon style={{ color: returnDisable ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000] }} />
      </button>
      {currentTaskIndex + 1}/{openTaskCount}
      <button
        onClick={() => handleChangeTask('next')}
        disabled={nextDisabled}
        className={nextDisabled ? style.disabled : ''}
        type='button'
        aria-label='next_icon'
      >
        <RightArrowIcon style={{ color: nextDisabled ? COLOR.GRAY[400] : COLOR.NEUTRAL[1000] }} />
      </button>
    </div>
  );
};

export default Task;
