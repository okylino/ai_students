import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid4 } from 'uuid';

import CloseIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import StarIcon from '@fishing_cat/assets/svgr/icons/star.svg';
import COLOR from '@fishing_cat/styles/color';

import style from './pointToast.module.css';

export const PointToastContext = createContext();

export const PointToastProvider = ({ children }) => {
  const [pointList, setPointList] = useState([]);
  const [points, setPoints] = useState(0);

  const updatePointList = (type) => {
    setPointList((prevPointList) => [...prevPointList, { id: uuid4(), type }]);
  };

  const close = (id) => {
    setPointList((currentPoint) => currentPoint.filter((point) => point.id !== id));
  };

  return (
    <PointToastContext.Provider value={{ updatePointList, points, setPoints }}>
      <div className={style.point_list}>
        {pointList.map((point) => (
          <Point key={point.id} id={point.id} type={point.type} close={close} />
        ))}
      </div>
      {children}
    </PointToastContext.Provider>
  );
};

const Point = ({ id, type, close }) => {
  const { t } = useTranslation();
  const isAdd = type === 'ADD';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      close(id);
    }, 3000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`${style.point_toast} ${isAdd ? style.add : style.subtract}`}>
      <div>
        {isAdd ? t('toastPointAdd') : t('toastPointMinus')}
        <StarIcon style={{ color: COLOR.YELLOW[500], width: '24px', marginLeft: '4px' }} />
      </div>
      <CloseIcon
        style={{ color: isAdd ? COLOR.YELLOW.L900 : COLOR.RED[600], width: '24px' }}
        onClick={() => {
          close(id);
        }}
      />
    </div>
  );
};
