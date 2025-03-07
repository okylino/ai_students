import styled from 'styled-components';
import { Typography } from '@mui/material';

export const PageTitle = styled(Typography)`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  letter-spacing: 0;
  vertical-align: middle;
  margin: 24px 0;
  align-self: flex-start;
  width: 828px;
  margin-left: 170px;
`;

export const ClassesContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px'
});

export const ClassList = styled('div')({
  width: '828px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
});

// 新增一个包装容器来控制整体布局
export const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '0 24px',
  maxWidth: '1200px',
  margin: '0 auto'
}); 