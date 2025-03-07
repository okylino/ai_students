import { useContext, useState } from 'react';

import QuizContext from '@fishing_cat/context/quizContext/QuizContext';

import style from './quiz.module.css';
import { RefreshBtn, RefreshIcon } from './quiz.style';

const Image = ({ questionImg }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const { enableTranslation } = useContext(QuizContext);

  const handleImgError = () => {
    setImageLoaded(false);
  };

  const handleRefreshImg = () => {
    setImageLoaded(true);
  };

  return (
    <div className={style.center_flex}>
      <div className={style.img_container} data-can-translate={enableTranslation}>
        {imageLoaded ? (
          <img src={questionImg} className={style.img} onError={handleImgError} alt='quizImage' />
        ) : (
          <RefreshBtn onClick={handleRefreshImg} type='button'>
            <RefreshIcon />
          </RefreshBtn>
        )}
      </div>
    </div>
  );
};

export default Image;
