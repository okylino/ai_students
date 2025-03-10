import styled from 'styled-components';

export const QuizWrapper = styled.div`
  width: 100%;
`;

export const QuizProgress = styled.div`
  background: #F4F3FF;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const QuizQuestion = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 24px;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px;
  background-color: ${props => props.selected ? '#e3f2fd' : '#ffffff'};
  border: 2px solid ${props => props.selected ? '#1976d2' : '#e0e0e0'};
  border-radius: 8px;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#e3f2fd' : '#f5f5f5'};
  }

  .option-label {
    width: 24px;
    height: 24px;
    border: 1px solid #E5E7EB;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }
`; 