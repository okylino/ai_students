import styled from 'styled-components';

// Add breakpoints for consistent responsive behavior
const breakpoints = {
  mobile: '480px',
  tablet: '768px'
};

export const PracticeZoneWrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: transparent;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 8px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 8px;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0; /* This allows flex items to shrink below their minimum content size */
  overflow: hidden;

  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    white-space: nowrap;

    &:hover {
      color: #333;
    }
  }

  span {
    color: #666;
    font-size: 14px;
    white-space: nowrap;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    gap: 4px;

    a, span {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
  flex-shrink: 0; /* Prevent button from shrinking */
  margin-left: 16px;

  &:hover {
    background: #2e3bb1;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100px;
    height: 40px;
    font-size: 14px;
    padding: 8px 16px;
    margin-left: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
    height: 36px;
    font-size: 14px;
    padding: 6px 12px;
    margin-left: 8px;
  }
`;

export const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  justify-content: center;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    margin-bottom: 12px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    line-height: 1.2;
  }
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

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 16px;
    max-width: 600px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
    width: 100%;
  }
`;

export const ChatSection = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 24px;
  width: 828px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 16px;
    max-width: 600px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 0;
    width: 100%;
  }

  /* Styles for AIChat container */
  .ai-chat-container {
    border-radius: 8px;

    @media (max-width: ${breakpoints.mobile}) {
      border-radius: 4px;
    }
  }

  /* Styles for chat messages */
  .chat-message {
    padding: 12px;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px;
      font-size: 14px;
    }
  }

  /* Styles for chat input */
  .chat-input {
    margin: 8px;

    @media (max-width: ${breakpoints.mobile}) {
      margin: 4px;
    }

    input, textarea {
      @media (max-width: ${breakpoints.mobile}) {
        font-size: 14px;
        padding: 8px;
      }
    }
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%;
    height: auto;
    min-height: 48px;
    padding: 8px 12px;
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
