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
  background: #2b3084;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  height: 48px;
  width: 180px;
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

export const ErrorToast = styled.div`
  position: fixed;
  width: 440px;
  height: 48px;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: #ffffff;
  border: 2px solid #f02b2b;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-100%);
    }
    to {
      transform: translateX(-50%) translateY(0);
    }
  }
`;

export const ErrorIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorMessage = styled.span`
  color: #000000;
  font-size: 14px;
  line-height: 22px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #f02b2b;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
