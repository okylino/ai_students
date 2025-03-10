import styled from 'styled-components';
import { Button } from '@mui/material';
import { PRIMARY } from '../../styles/colors';
import StarIcon from '../../assets/classes/BsStarFill.png';
import KeyboardArrowUpIcon from '../../assets/classes/KeyboardArrowUp.png';

export const Card = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 828px;
  padding: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 16px;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: 160%;
  color: #333333;
  margin: 0;
`;

export const ClassId = styled.div`
  color: #666666;
  font-size: 14px;
  line-height: 160%;
`;

export const CardContent = styled.div<{ isexpanded: boolean }>`
  display: ${props => props.isexpanded ? 'block' : 'none'};
`;

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LessonItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 48px;
`;

export const TimeStamp = styled.span`
  font-family: sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #666666;
  width: 200px;
`;

export const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 80px;
`;

export const StarIconImg = styled.img.attrs({
  src: StarIcon,
  alt: 'star'
})`
  width: 16px;
  height: 16px;
`;

export const StarCount = styled.span`
  color: #333333;
  font-size: 14px;
  line-height: 160%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-left: auto;
`;

export const ActionButton = styled(Button)`
  &.MuiButton-root {
    min-width: 100px;
    height: 40px;
    text-transform: none;
    border-radius: 4px;
    
    &.MuiButton-contained {
      background-color: ${PRIMARY.DEFAULT};
      color: white;
      
      &:hover {
        background-color: ${PRIMARY.DEFAULT};
      }
    }
    
    &.MuiButton-outlined {
      border-color: ${PRIMARY.DEFAULT};
      color: ${PRIMARY.DEFAULT};
    }
  }
`;

export const ExpandButton = styled.button<{ isexpanded: boolean }>`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.2s;
    transform: ${props => props.isexpanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

export const SeeAllText = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-top: 16px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`; 