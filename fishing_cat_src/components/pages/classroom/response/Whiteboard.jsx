import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import CloseIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import PlaneTiltIcon from '@fishing_cat/assets/svgr/icons/paper-plane-tilt.svg';
import COLOR from '@fishing_cat/styles/color';
import UndoIcon from '@/assets/svgr/icons/arrow-counterclockwise.svg';
import EraserIcon from '@/assets/svgr/icons/eraser-fill.svg';
import TrashIcon from '@/assets/svgr/icons/trash.svg';

import style from './response.module.css';
import { ErrorIcon, ToolButton, ToolWrapper } from './response.style';

const transparent = '#00000000';

const Whiteboard = ({ closeWhiteboard, img, whiteboardType, setEditImgData, editImgData, taskId }) => {
  const [color, setColor] = useState(COLOR.NEUTRAL[1000]);
  const [background, setBackground] = useState('');
  const canvasRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [styleWidth, setStyleWidth] = useState(0);
  const [styleHeight, setStyleHeight] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [isBoardEmpty, setIsBoardEmpty] = useState(true);
  const [isExportError, setIsExportError] = useState(false);
  const { t } = useTranslation();
  const [initImg, setInitImg] = useState(img);
  const [isNewMark, setIsNewMark] = useState(false);

  useEffect(() => {
    const blackBtn = document.getElementById('blackBtn');
    if (blackBtn) {
      blackBtn.click();
    }
    changeCanvasSize();
  }, []);

  //!  can fix the bug in Firefox, but it might break the erasing functionality in other browsers
  // useEffect(() => {
  //     document.querySelector("#react-sketch-canvas__stroke-group-0")?.removeAttribute("mask");
  // }, [isBoard]);

  useEffect(() => {
    if (whiteboardType === 'edit') {
      console.log('open whiteboard with background');
      if (editImgData.data) {
        setBackground(editImgData.data);
      } else {
        convertS3ToBase64(img, true);
      }
    } else {
      console.log('open whiteboard without background');
      setBackground('', false);
    }
  }, [whiteboardType]);

  useEffect(() => {
    // clear path and change background if teacher mark task again
    if (img !== initImg) {
      clearCanvas();
      if (whiteboardType === 'edit') convertS3ToBase64(img, true);
      setIsNewMark(true);
      setTimeout(() => {
        setIsNewMark(false);
      }, 3000);
    }
  }, [img]);

  const changeCanvasSize = () => {
    const windowWidth = window.innerWidth;
    const a = 1920 / windowWidth;
    setStyleWidth(windowWidth);
    setStyleHeight(1080 / a);
    setRatio(a);
  };

  const convertS3ToBase64 = async (s3url, isSetBackground) => {
    const response = await fetch(s3url, {
      mode: 'cors',
      cache: 'no-cache',
    });
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      if (isSetBackground) setBackground(reader.result);
      changeCanvasSize();
    };
  };

  const setPen = (color) => {
    if (color === 'eraser') {
      setColor(transparent);
      canvasRef.current.eraseMode(true);
    } else {
      setColor(color);
      try {
        canvasRef.current.eraseMode(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const clearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  const undoCanvas = () => {
    canvasRef.current.undo();
  };

  const exportEditData = useCallback(async () => {
    setPen(transparent);
    setIsLoading(true);
    let originalPaths = [];

    canvasRef.current
      .exportPaths()
      .then((data) => {
        originalPaths = data;
        data.forEach((path) =>
          path.paths.forEach((dot) => {
            dot.x *= ratio;
            dot.y *= ratio;
          }),
        );
        data.forEach((strokeWidth) => {
          strokeWidth.strokeWidth *= ratio;
        });
        setStyleHeight(1080);
        setStyleWidth(1920);
        canvasRef.current.loadPaths(data);
      })
      .then(() => {
        canvasRef.current
          .exportImage('png')
          .then(async (data) => {
            if (data === 'data:,') {
              restoreOriginalCanvas(originalPaths);
            } else {
              setEditImgData({ taskId, data });
              closeWhiteboard();
            }
          })
          .catch((e) => console.log(e));
      });
  }, [background, ratio]);

  const restoreOriginalCanvas = (paths) => {
    setIsExportError(true);
    const windowWidth = window.innerWidth;
    setStyleWidth(windowWidth);
    setStyleHeight(1080 / ratio);

    paths.forEach((path) =>
      path.paths.forEach((dot) => {
        dot.x /= ratio;
        dot.y /= ratio;
      }),
    );
    paths.forEach((strokeWidth) => {
      strokeWidth.strokeWidth /= ratio;
    });
    canvasRef.current.loadPaths(paths);

    setTimeout(() => {
      setIsExportError(false);
    }, 3000);
    setIsLoading(false);
  };

  const handleCanvasChange = (path) => {
    const isOnlyEraser = path.every((obj) => !obj.drawMode);
    if (path.length !== 0 && !isOnlyEraser) {
      setIsBoardEmpty(false);
    } else {
      setIsBoardEmpty(true);
    }
  };

  return (
    <>
      <div className={style.black_stripe}>
        <div>
          <span onClick={() => closeWhiteboard()} className={style.pointer}>
            <CloseIcon />
            {t('cancelBtn')}
          </span>
        </div>

        <div className={style.btn_list}>
          <ColorPen setPen={setPen} color={color} />
          <Tool setPen={setPen} undoCanvas={undoCanvas} clearCanvas={clearCanvas} color={color} />
        </div>

        <div className={`${style.mobile_btn_list}`}>
          <Tool setPen={setPen} undoCanvas={undoCanvas} clearCanvas={clearCanvas} color={color} />
        </div>

        <div>
          <button className={style.send} onClick={exportEditData} disabled={isBoardEmpty}>
            <PlaneTiltIcon />
            {t('done')}
          </button>
        </div>
      </div>

      <ReactSketchCanvas
        ref={canvasRef}
        style={{
          width: `${styleWidth}px`,
          height: `${styleHeight}px`,
          visibility: isLoading ? 'hidden' : 'visible',
        }}
        strokeWidth={4}
        strokeColor={color}
        backgroundImage={background}
        canvasColor='white'
        exportWithBackgroundImage
        onChange={(path) => handleCanvasChange(path)}
      />

      <div className={style.black_stripe}>
        <div className={`${style.mobile_btn_list}`}>
          <ColorPen setPen={setPen} color={color} />
        </div>
      </div>

      {isExportError && <WrongToast msg={t('toastWrong')} handleClose={() => setIsExportError(false)} />}
      {isNewMark && <WrongToast msg={t('toastNewMark')} handleClose={() => setIsNewMark(false)} />}
    </>
  );
};

const WrongToast = ({ msg, handleClose }) => (
  <div className={`error ${style.toast}`}>
    <div>
      <ErrorIcon />
      {msg}
    </div>
    <img src={close} onClick={handleClose} alt='close_icon' className={style.close} />
  </div>
);

const activeStyle = {
  boxShadow: `0 0 0 1px ${COLOR.NEUTRAL[0]}, 0 0 0 3px ${COLOR.GRAY[900]}`,
};

const ColorPen = ({ setPen, color }) => {
  const colors = [
    { code: COLOR.INVALID.Default, className: style.red },
    { code: COLOR.YELLOW.L500, className: style.yellow },
    { code: COLOR.GREEN[900], className: style.green },
    { code: COLOR.BLUE[800], className: style.sky },
    { code: COLOR.NEUTRAL[0], className: style.white },
    { code: COLOR.NEUTRAL[1000], className: style.black },
  ];

  return (
    <>
      {colors.map(({ code, className }) => (
        <button
          type='button'
          className={className}
          style={color === code ? activeStyle : {}}
          key={code}
          onClick={() => setPen(code)}
        />
      ))}
    </>
  );
};

const Tool = ({ setPen, undoCanvas, clearCanvas, color }) => (
  <>
    <ToolButton $active={color === transparent} onClick={() => setPen('eraser')}>
      <EraserIcon />
    </ToolButton>
    <ToolWrapper onClick={undoCanvas}>
      <UndoIcon />
    </ToolWrapper>
    <ToolWrapper onClick={clearCanvas}>
      <TrashIcon />
    </ToolWrapper>
  </>
);

export default Whiteboard;
