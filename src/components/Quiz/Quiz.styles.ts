import styled from 'styled-components';

export const QuizWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
`;
export const QuizContainer = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 24px;
  width: 100%;

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

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
`;

interface OptionButtonProps {
  selected?: boolean;
}

export const OptionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

export const OptionLabel = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-weight: 500;
  color: #000000;
`;

export const OptionButton = styled.button<OptionButtonProps>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 58px;
  padding: 16px 12px;
  border-radius: 8px;
  background: ${props => props.selected ? '#2B3084' : '#FFFFFF'};
  color: ${props => props.selected ? '#FFFFFF' : '#000000'};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.selected ? '#2B3084' : '#E5E5E5'};

  &:hover {
    background: ${props => props.selected ? '#2B3084' : '#F5F5FF'};
  }
`;