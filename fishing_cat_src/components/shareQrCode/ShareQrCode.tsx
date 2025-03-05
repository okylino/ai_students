import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import api from '@fishing_cat/api';
import CopyIcon from '@fishing_cat/assets/svgr/icons/copy.svg';
import * as $ from '@fishing_cat/components/shareQrCode/ShareQrCode.style';
import { RoomInfoProps, ShareQrCodeProps } from '@fishing_cat/components/shareQrCode/ShareQrCode.type';
import { toastType } from '@fishing_cat/enums/toastType';
import { useAppDispatch } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';

const ShareQrCode = ({ setIsShareQrCodeOpen }: ShareQrCodeProps) => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const { t } = useTranslation();
  const [classRoomInfo, setClassRoomInfo] = useState({ display_name: '', room_number: '' });
  const shareUrl = `${window.location.origin}?roomId=${roomId}`;

  useEffect(() => {
    const getRoom = async () => {
      if (!roomId) return;
      const room = await api.room.getRoomInfo({ roomId });
      setClassRoomInfo({ display_name: room.display_name, room_number: room.room_number });
    };
    getRoom();

    QRCode.toDataURL(shareUrl, (err, url) => {
      if (err) throw err;
      setQrCodeUrl(url);
    });
  }, [roomId, shareUrl]);

  const roomInfos = [
    {
      id: 0,
      infoText: `ID: ${classRoomInfo.room_number}`,
      copyText: classRoomInfo.room_number,
    },
    {
      id: 1,
      infoText: t('classLink'),
      copyText: shareUrl,
    },
  ];

  return (
    <$.Overlay>
      <$.FlexWrapper>
        <$.SizeWrapper>
          <$.CloseIcon onClick={() => setIsShareQrCodeOpen(false)} />
          <$.QrCodeWrapper>
            <$.RoomName>{classRoomInfo.display_name}</$.RoomName>
            <$.RoomInfoWrapper>
              {roomInfos.map((info) => (
                <RoomInfo key={info.id} infoText={info.infoText} copyText={info.copyText} />
              ))}
            </$.RoomInfoWrapper>
            <$.QrCodeImg src={qrCodeUrl} alt='QR Code' />
          </$.QrCodeWrapper>
        </$.SizeWrapper>
      </$.FlexWrapper>
    </$.Overlay>
  );
};

const RoomInfo = ({ infoText, copyText }: RoomInfoProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
    dispatch(
      openToastWithMessage({
        message: t('toastCopied'),
        type: toastType.SUCCESS,
      }),
    );
  };

  return (
    <$.Info>
      {infoText}
      <$.copyButton onClick={() => handleCopyClick(copyText)}>
        <CopyIcon />
      </$.copyButton>
    </$.Info>
  );
};

export default ShareQrCode;
