import styled from 'styled-components';

// Add breakpoints for consistent responsive behavior
const breakpoints = {
  mobile: '480px',
  tablet: '768px'
};

export const QuizWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  min-height: 207px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
    min-height: 180px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
    min-height: 160px;
  }
`;

export const QuizContent = styled.div`
  flex: 4;
`;

export const QuizContainer = styled.div`
  width: 828px;
  margin: 0 auto;
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    max-width: 600px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const QuizProgress = styled.div`
  background: #f5f5ff;
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 24px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 12px;
    margin-bottom: 16px;
    font-size: 14px;
  }
`;

export const QuizQuestion = styled.h2`
  font-size: 16px;
  margin-bottom: 24px;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 16px;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: auto;
  padding-top: 27px;
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: 16px;
    padding-top: 16px;
  }
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
  background-color: #ededfd;
  transition: background-color 0.2s ease;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 2px 2px 0 0;
    border-color: #2b3084;
    transform: ${({ $prev }) => ($prev ? 'rotate(-135deg)' : 'rotate(45deg)')};
    display: inline-block;
    transition: border-color 0.2s ease;
  }

  &:hover:not(:disabled) {
    background-color: #6d6df3;
    &::before {
      border-color: white;
    }
  }

  &:active:not(:disabled) {
    background-color: #3b3bd1;
    &::before {
      border-color: white;
    }
  }

  &:disabled {
    background-color: #cfcfcf;
    cursor: not-allowed;
    &::before {
      border-color: #ffffff;
      opacity: 0.5;
    }
  }

  ${(props) =>
    props.$prev &&
    `
    // prev 相关的样式
  `}
`;

export const OptionsGrid = styled.div`
  width: 828px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    max-width: 600px;
    gap: 12px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 406px;
  
  @media (max-width: ${breakpoints.tablet}) {
    width: calc(50% - 6px);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
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
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 375px;
  min-height: 58px;
  padding: 16px 12px;
  border-radius: 8px;
  background: ${(props) => (props.selected ? '#2B3084' : '#FFFFFF')};
  color: ${(props) => (props.selected ? '#FFFFFF' : '#000000')};
  border: 1px solid ${(props) => (props.selected ? '#2B3084' : '#E5E5E5')};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.selected ? '#2B3084' : '#F5F5FF')};
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    min-height: 50px;
    padding: 12px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    min-height: 44px;
    padding: 12px 10px;
    font-size: 14px;
  }
`;
