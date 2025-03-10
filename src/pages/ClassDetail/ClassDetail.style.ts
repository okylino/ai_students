import styled from 'styled-components';
import { Pagination } from '@mui/material';

export const ClassDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #666;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 0;
`;

export const PageInfo = styled.div`
  color: #666;
  font-size: 14px;
`;

export const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    margin: 0 4px;
    
    &.Mui-selected {
      background-color: #35416B;
      color: white;
      
      &:hover {
        background-color: #35416B;
      }
    }
    
    &:hover {
      background-color: rgba(53, 65, 107, 0.1);
    }
  }
`; 