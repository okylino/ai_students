import MicRecorder from 'mic-recorder-to-mp3';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Timecode from 'react-timecode';
import Timer from 'react-timer-wrapper';

import { postPresignedUrl } from '@fishing_cat/api/services/lessonService';
import { putFileToPresignedUrl } from '@fishing_cat/api/services/presignedUrlService';
import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { LOCAL_STORAGE_KEY } from '@fishing_cat/enums/localStorageKey';
import { PRESIGNED_URL } from '@fishing_cat/enums/presignedUrlType';
import { toastType } from '@fishing_cat/enums/toastType';
import { useAppDispatch } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { localStorageUtils } from '@fishing_cat/utils/localStorageUtils';
import SendIcon from '@/assets/svgr/icons/send.svg';
import SpinnerBorder from '@/components/prototypes/SpinnerBorder';

import Image from './Image';
import style from './quiz.module.css';
import {
  ErrorIcon,
  FlexJustifyCenter,
  MicIcon,
  MicIconButton,
  RecordAudioButton,
  RecordAudioIcon,
  RecordStopButton,
  RecordStopIcon,
  ToastWrapper,
} from './quiz.style';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Record = ({ setIsAnswerSuccess, isAnswerSuccess, answerQuiz, quiz }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [recordFinish, setRecordFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const { lessonId } = useContext(LessonContext);
  const { enableTranslation } = useContext(QuizContext);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [times, setTimes] = useState({ start: null, stop: null });
  const [isSendFail, setIsSendFail] = useState(false);

  const { imgUrl, status: quizStatus, studentAnswer, id: questionId } = quiz;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        audioRef.current.currentTime = 1e101;
        audioRef.current.ontimeupdate = () => {
          audioRef.current.currentTime = 0;
          audioRef.current.ontimeupdate = null;
        };
      };
    }
  }, [file]);

  useEffect(() => {
    if (studentAnswer && studentAnswer.length > 0) {
      setIsAnswerSuccess(true);
    }
    // eslint-disable-next-line
  }, [studentAnswer]);

  useEffect(() => {
    if (quizStatus === 'FINISH') Mp3Recorder.stop();
  }, [quizStatus]);

  useEffect(() => {
    setRecordFinish(false);
    setFile();
    setBlobURL('');
    setTimes({ start: null, stop: null });
  }, [questionId]);

  const requestAudioPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      localStorageUtils.setItem(LOCAL_STORAGE_KEY.BROWSER_MICROPHONE_PERMISSION, true);
    } catch (error) {
      localStorageUtils.setItem(LOCAL_STORAGE_KEY.BROWSER_MICROPHONE_PERMISSION, false);
      dispatch(
        openToastWithMessage({
          message: t('toastMicError'),
          type: toastType.WARNING,
        }),
      );
    }
  };

  const checkAudioPermission = async () => {
    if (navigator.permissions) {
      try {
        // use `as PermissionName` to fix this TS issue: https://github.com/microsoft/TypeScript/issues/33923
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        console.log('audio permissions', permissionStatus.state);
        return permissionStatus.state === 'granted';
      } catch (error) {
        console.error('Error checking microphone permission:', error);
        return false;
      }
    } else {
      console.warn('navigator.permissions is not supported. Falling back to check by localStorage.');
      const permissions = localStorageUtils.getItem<boolean>(LOCAL_STORAGE_KEY.BROWSER_MICROPHONE_PERMISSION);
      return !!permissions;
    }
  };

  const startMicRecorder = () => {
    const startTime = new Date();
    Mp3Recorder.start()
      .then(() => {
        setIsRecording(true);
        setTimes((prev) => ({ ...prev, start: startTime }));
      })
      .catch((e) => console.error(e));
  };

  const start = async () => {
    const hasPermission = await checkAudioPermission();
    if (hasPermission) {
      startMicRecorder();
    } else {
      requestAudioPermission();
    }
  };

  const stop = () => {
    setRecordFinish(true);
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const stopTime = new Date();
        setTimes((prev) => ({ ...prev, stop: stopTime }));
        console.log('blob', blob);
        setFile(blob);

        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  const sendAudio = async () => {
    setLoading(true);
    if (times.stop - times.start <= 1000 || !file) {
      sendFailHandling();
    } else {
      try {
        const data = await postPresignedUrl({ lessonId, type: PRESIGNED_URL.AUDIO });
        const putUrl = data.put;
        const getUrl = data.get;
        await putFileToPresignedUrl(putUrl, file);
        setLoading(false);
        answerQuiz(getUrl);
      } catch (e) {
        console.log(e);
        sendFailHandling();
      }
    }
  };

  const sendFailHandling = () => {
    setIsSendFail(true);
    setLoading(false);
    setTimeout(() => {
      setIsSendFail(false);
    }, '3000');
  };

  return (
    <>
      <Image questionImg={imgUrl} />

      {enableTranslation && <TranslationTool questionId={questionId} />}

      {quizStatus === 'OPEN' && !isAnswerSuccess && (
        <>
          {recordFinish ||
            (!isRecording && (
              <>
                <div className={style.p}>{t('clickToStartRecording')}</div>
                <center>
                  <MicIconButton onClick={start}>
                    <MicIcon />
                  </MicIconButton>
                </center>
              </>
            ))}

          {recordFinish ||
            (isRecording && (
              <>
                <div className={style.p}>
                  <Timer active duration={61 * 1000} onFinish={stop}>
                    <Timecode />
                  </Timer>
                </div>
                <center>
                  <RecordStopButton onClick={stop}>
                    <RecordStopIcon />
                  </RecordStopButton>
                </center>
              </>
            ))}

          {recordFinish && (
            <div className={style.audio}>
              <audio src={blobURL} controls='controls' ref={audioRef} />
              <RecordAudioButton
                onClick={() => {
                  setRecordFinish(false);
                  setIsRecording(false);
                }}
              >
                <RecordAudioIcon />
              </RecordAudioButton>
              <RecordAudioButton $active={loading} onClick={sendAudio}>
                {loading ? (
                  <FlexJustifyCenter>
                    <SpinnerBorder />
                  </FlexJustifyCenter>
                ) : (
                  <SendIcon />
                )}
              </RecordAudioButton>
            </div>
          )}
        </>
      )}

      {isAnswerSuccess && <div className={style.p}>{t('toastSubmitSuccess')}</div>}
      {isSendFail && (
        <ToastWrapper $isSuccess={false}>
          <ErrorIcon />
          {t('toastSubmitFailed')}
        </ToastWrapper>
      )}
    </>
  );
};

export default Record;
