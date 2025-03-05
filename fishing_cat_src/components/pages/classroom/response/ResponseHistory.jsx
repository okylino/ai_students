import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

import pushIcon from '@fishing_cat/assets/response/StatusPushIcon.png';

import Link from './Link';
import style from './response.module.css';
import { CheckCircle, CheckIcon } from './response.style';

const ResponseHistory = ({ task }) => (
  <div className={style.history_item}>
    <OriginTask task={task} />

    <p>
      <br />
      <img src={pushIcon} className={style.icon} alt='icon' />
    </p>

    <StudentTask task={task} />
    <TeacherTask task={task} />
  </div>
);

const OriginTask = ({ task }) => (
  <div>
    {task.type === 'LINK' ? (
      <div className={style.history_border}>
        <Link size='thumbnail' metadata={task?.linkMeta} url={task.link} />
      </div>
    ) : (
      <img src={task.originImg} alt='task' />
    )}

    <div className={style.text_time}>{moment.unix(task.createdAt).format('YYYY.MM.DD h:mm a')}</div>
  </div>
);

const StudentTask = ({ task }) => {
  const { t } = useTranslation();
  return (
    <div>
      {task.type === 'LINK' ? (
        <>
          <div className={style.history_border}>
            <Link size='thumbnail' metadata={task?.linkMeta} url={task.link} />
          </div>
          <div className={task?.linkIsOpen ? style.text_green : style.text_gray}>
            {task?.linkIsOpen ? (
              <>
                {t('stateOpened')}
                <CheckCircle>
                  <CheckIcon />
                </CheckCircle>{' '}
              </>
            ) : (
              t('stateNoOpened')
            )}
          </div>
        </>
      ) : task.studentImg ? (
        <>
          <img src={task.studentFile} alt='task' />
          <br />
          <div className={style.text_green}>
            {t('stateAnswered')}
            <CheckCircle>
              <CheckIcon />
            </CheckCircle>
          </div>
        </>
      ) : (
        <>
          <div className={style.history_border} />
          <div className={style.text_gray}>{t('stateNoResponse')}</div>
        </>
      )}
    </div>
  );
};

const TeacherTask = ({ task }) => {
  const { t } = useTranslation();

  return (
    <div>
      {task.type === 'LINK' ? (
        <div className={style.empty_border} />
      ) : task.teacherImg ? (
        <>
          <img src={task.teacherImg} alt='task' />
          <br />
          <div className={style.text_green}>
            {t('graded')}
            <CheckCircle>
              <CheckIcon />
            </CheckCircle>
          </div>{' '}
        </>
      ) : (
        <>
          <div className={style.history_border} />
          <div className={style.text_gray}>{t('notGraded')}</div>
        </>
      )}
    </div>
  );
};

export default ResponseHistory;
