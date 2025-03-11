import styled from 'styled-components';

export const PracticeZoneWrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: transparent;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      color: #333;
    }
  }
  
  span {
    color: #666;
    font-size: 14px;
  }
`;

export const Separator = styled.span`
  color: #666;
`;

export const SubmitButton = styled.button`
  background: #3D4EEA;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #2e3bb1;
  }
`;

export const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  justify-content: center;
`;

export const HintIcon = styled.img`
  width: 14.62px;
  height: 17.37px;
`;

export const HintText = styled.p`
  margin: 0;
  color: #666;
  font-family: sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.006em;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const QuizSection = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 24px;
  width: 828px;
  margin: 0 auto;
`;

export const ChatSection = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 24px;
  width: 828px;
  margin: 0 auto;
`; 