import CircularProgress from '@mui/material/CircularProgress';

import COLOR from '@fishing_cat/styles/color';

export default function CustomSpinner() {
  return <CircularProgress sx={{ color: COLOR.BLUE[100], alignSelf: 'center', marginTop: '48px' }} />;
}
