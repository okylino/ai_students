import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

export const Wrapper = styled('div')({
  width: '100%',
  maxWidth: 680,
  margin: '0px auto',
  padding: '20px 20px 0px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  '@media (max-width: 700px)': {
    padding: '16px 20px 20px',
  },
});

export const ActionWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,

  '@media (max-width: 700px)': {
    marginBottom: 8,
  },
});

export const Back = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',

  '@media (max-width: 700px)': {
    fontSize: 14,
  },

  '& > img': {
    width: 24,
    marginRight: 4,
  },
});

export const Save = styled('div')(({ $isDisableSave }: { $isDisableSave: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 600,
  color: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[700],
  cursor: $isDisableSave ? 'not-allowed' : 'pointer',

  '@media (max-width: 700px)': {
    fontSize: 14,
  },

  ':hover': {
    color: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[500],

    path: {
      fill: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[500],
    },
  },

  ':active': {
    color: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[700],

    path: {
      fill: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[700],
    },
  },

  '& > svg': {
    width: 24,
    marginRight: 4,

    '& > path': {
      fill: $isDisableSave ? COLOR.NEUTRAL[500] : COLOR.TEAL[700],
    },
  },
}));

export const Name = styled('span')({
  textAlign: 'center',
  textOverflow: 'ellipsis',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
});

export const AvatarWrapper = styled('div')({
  width: '100%',
  height: 'calc(100vh - 229px)', // 229 是扣掉上面跟下面的高度
  maxWidth: 640,
  maxHeight: 560,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '82px 0px 28px 0px',
  margin: '0px auto',
  position: 'relative',
  borderRadius: 16,
  backgroundColor: COLOR.NEUTRAL[0],
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.16)',

  '@media (max-width: 700px)': {
    maxWidth: 540,
    maxHeight: '100%',
    padding: '24px 0px 0px 0px',
  },

  '&::before': {
    content: '""',
    width: 106,
    height: 106,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '50%',
    top: -45,
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.16)',
    zIndex: -1,

    '@media (max-width: 700px)': {
      display: 'none',
    },
  },
});

export const Tab = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '24px 0px',
  backgroundColor: '#E6E8F4',
  borderRadius: 100,

  '@media (max-width: 700px)': {
    margin: '16px 0px',
  },
});

export const TabItem = styled('div')(({ $isActived }: { $isActived: boolean }) => ({
  width: 124,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  backgroundColor: $isActived ? COLOR.VIOLET[700] : '#E6E8F4',
  textAlign: 'center',
  color: $isActived ? COLOR.NEUTRAL[0] : COLOR.NEUTRAL[900],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '120%',
  cursor: 'pointer',
  transition: 'all 0.3s',
}));

export const List = styled('div')({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  padding: '0px 38px',
  margin: '0px auto',
  gap: 16,
  overflowX: 'hidden',
  overflowY: 'auto',

  '@media (max-width: 700px)': {
    maxWidth: 340,
    padding: '0px 20px',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 12,
    paddingBottom: 24,
  },
});

export const ListItem = styled('div')(({ $isActived }: { $isActived: boolean }) => ({
  width: 100,
  height: 100,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: $isActived ? `3px solid ${COLOR.TEAL[500]}` : `0.8px solid ${COLOR.NEUTRAL[500]}`,
  borderRadius: 16,
  cursor: 'pointer',

  '@media (max-width: 700px)': {
    width: 90,
    height: 90,
  },
}));

export const BackgroundColor = styled('div')(({ $background }: { $background: string }) => ({
  width: 70,
  height: 70,
  borderRadius: 8,
  backgroundColor: $background,

  '@media (max-width: 700px)': {
    width: 60,
    height: 60,
  },
}));

export const Avatar = styled('div')(({ $background }: { $background: string }) => ({
  width: 106,
  height: 106,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: $background,
  position: 'absolute',
  top: -45,
  left: '50%',
  transform: 'translateX(-50%)',
  border: '8px solid #ffffff',

  '@media (max-width: 700px)': {
    width: 80,
    height: 80,
    marginBottom: 16,
    flexShrink: 0,
    position: 'initial',
    transform: 'initial',
    border: 'none',
  },

  '& > img ': {
    width: 72,
    height: 72,

    '@media (max-width: 700px)': {
      width: 64,
      height: 64,
    },
  },
}));

export const LegalVersionWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
});
