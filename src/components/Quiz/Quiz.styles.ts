import styled from 'styled-components';

export const QuizWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  min-height: 207px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const QuizContent = styled.div`
  flex: 4;
`;

export const QuizContainer = styled.div`
  width: 828px;
  margin: 0 auto;
`;

export const QuizProgress = styled.div`
  background: #F5F5FF;
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 24px;
`;

export const QuizQuestion = styled.h2`
  font-size: 16px;
  margin-bottom: 24px;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: auto;
  padding-top: 27px;
`;

interface NavButtonProps {
  $prev?: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EDEDFD;
  transition: background-color 0.2s ease;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 2px 2px 0 0;
    border-color: #2B3084;
    transform: ${({ $prev }) => $prev ? 'rotate(-135deg)' : 'rotate(45deg)'};
    display: inline-block;
    transition: border-color 0.2s ease;
  }

  &:hover:not(:disabled) {
    background-color: #6D6DF3;
    &::before {
      border-color: white;
    }
  }

  &:active:not(:disabled) {
    background-color: #3B3BD1;
    &::before {
      border-color: white;
    }
  }

  &:disabled {
    background-color: #CFCFCF;
    cursor: not-allowed;
    &::before {
      border-color: #FFFFFF;
      opacity: 0.5;
    }
  }

  ${props => props.$prev && `
    // prev 相关的样式
  `}
`;

export const OptionsGrid = styled.div`
  width: 828px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

export const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 406px;
`;

export const OptionLabel = styled.div`
  width: 23px;
  height: 23px;
  border: 2px solid #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #000000;
  font-weight: 500;
  flex-shrink: 0;
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 375px;
  min-height: 58px;
  padding: 16px 12px;
  border-radius: 8px;
  background: ${props => props.selected ? '#2B3084' : '#FFFFFF'};
  color: ${props => props.selected ? '#FFFFFF' : '#000000'};
  border: 1px solid ${props => props.selected ? '#2B3084' : '#E5E5E5'};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.selected ? '#2B3084' : '#F5F5FF'};
  }
`;