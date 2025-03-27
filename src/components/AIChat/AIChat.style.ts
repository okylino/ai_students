import styled, { keyframes } from 'styled-components';

// Add breakpoints for consistent responsive behavior
const breakpoints = {
  mobile: '480px',
  tablet: '768px'
};

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 828px;
  height: 504px;
  border-radius: var(--vsx-radius-400);
  justify-content: space-between;
  background-color: #f8f9fa;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    height: 450px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 400px;
    border-radius: 8px;
  }
`;

export const Header = styled.div`
  width: 780px;
  height: 35px;
  border-radius: 8px;
  gap: 10px;
  padding: 8px 16px;
  background: #ededfd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 12px;

  div {
    margin: 0;
    color: #2b3084;
    font-size: 16px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%;
    height: 32px;
    padding: 6px 12px;

    div {
      font-size: 14px;
    }
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  height: calc(504px - 172px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: calc(450px - 150px);
    padding: 0.75rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: calc(400px - 130px);
    padding: 0.5rem;
  }
`;

export const Message = styled.div<{ isAI: boolean }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  position: relative;
  padding-left: ${(props) => (props.isAI ? '48px' : '0')};

  ${(props) =>
    !props.isAI &&
    `
    margin-left: auto;
    flex-direction: column;
    align-items: flex-end;
  `}

  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${(props) => (props.isAI ? '36px' : '0')};
    margin-bottom: 0.75rem;
  }
`;

export const MessageBox = styled.div<{ isAI: boolean; isGenerating?: boolean }>`
  width: ${(props) => (props.isGenerating ? '66px' : '468px')};
  min-height: ${(props) => (props.isGenerating ? '38px' : props.isAI ? '84px' : '48px')};
  gap: ${(props) => (props.isAI ? '10px' : '6px')};
  padding: 16px;
  background: ${(props) => (props.isAI ? '#FAFAFA' : '#2B3084')};
  color: ${(props) => (props.isAI ? '#000000' : '#ffffff')};
  box-shadow: ${(props) => (props.isAI ? '0px 2px 6px 0px #0000001F' : '0px 1px 6px 0px #2629751F')};

  ${(props) =>
    props.isAI
      ? `
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  `
      : `
    border-radius: 12px;
  `}

  @media (max-width: ${breakpoints.tablet}) {
    width: ${(props) => (props.isGenerating ? '66px' : 'calc(100% - 20px)')};
    max-width: 400px;
    padding: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: ${(props) => (props.isGenerating ? '60px' : 'calc(100% - 10px)')};
    max-width: 300px;
    min-height: ${(props) => (props.isGenerating ? '32px' : props.isAI ? '60px' : '40px')};
    padding: 10px;
  }
`;

export const AIAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  margin-right: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 28px;
    height: 28px;
  }
`;

const loadingDotAnimation = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

export const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #d6d6d6;
  border-radius: 50%;
  animation: ${loadingDotAnimation} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

export const MessageContent = styled.div<{ isAI: boolean }>`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${(props) => (props.isAI ? '#000000' : '#ffffff')};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    line-height: 150%;
  }
`;

export const Timestamp = styled.span`
  font-size: 12px;
  color: #adb5bd;
  margin-top: 4px;
`;

export const BottomSection = styled.div`
  width: 828px;
  height: 172px;
  gap: var(--vsx-space-300);
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    height: 150px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 130px;
    gap: 4px;
  }
`;

export const SuggestionsContainer = styled.div<{ isLoading: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  height: 92px;
  overflow-x: auto;
  flex-shrink: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  visibility: ${(props) => (props.isLoading ? 'hidden' : 'visible')};

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.75rem;
    height: 80px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.5rem;
    height: 60px;
    gap: 0.35rem;
  }
`;

export const SuggestionChip = styled.button`
  height: 68px;
  min-width: 200px;
  max-width: 300px;
  background: #ededfd;
  border: none;
  border-radius: 16px;
  padding: 12px 16px;
  cursor: pointer;
  color: #495057;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 22px;
  font-size: 14px;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 60px;
    min-width: 160px;
    max-width: 250px;
    padding: 10px 14px;
    border-radius: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 50px;
    min-width: 120px;
    max-width: 180px;
    padding: 8px 10px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 10px;
  }
`;

export const InputContainer = styled.div`
  width: 828px;
  height: 80px;
  gap: 10px;
  padding: 16px 24px;
  background-color: #ffffff;
  border-top: 2px solid #dee2e6;
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    height: 70px;
    padding: 12px 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 60px;
    padding: 8px 12px;
    gap: 6px;
  }
`;

export const MessageInput = styled.input`
  width: 722px;
  height: 48px;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;

  &::placeholder {
    color: #adb5bd;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: calc(100% - 48px);
    height: 42px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100% - 42px);
    height: 36px;
    padding: 0.5rem;
    font-size: 14px;
  }
`;

export const ScrollTopButton = styled.button<{ isActive?: boolean; isGenerating?: boolean; disabled?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.disabled) return '#CFCFCF';
    if (props.isGenerating) return '#cfcfcf';
    return props.isActive ? '#2e2eb2' : '#cfcfcf';
  }};
  border: 1px solid #dee2e6;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${(props) => {
      if (props.disabled) return '#E9ECEF';
      if (props.isGenerating) return '#cfcfcf';
      return props.isActive ? '#2e2eb2' : '#cfcfcf';
    }};
  }
  &:active {
    background-color: ${(props) => {
      if (props.disabled) return '#E9ECEF';
      return props.isGenerating ? '#cfcfcf' : '#040a6b';
    }};
  }

  img {
    width: ${(props) => {
      if (props.isGenerating) return '48px';
      return '20px';
    }};
    height: ${(props) => {
      if (props.isGenerating) return '48px';
      return '20px';
    }};
    opacity: ${props => props.disabled ? 0.5 : 1};
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 42px;
    height: 42px;

    img {
      width: ${(props) => {
        if (props.isGenerating) return '42px';
        return '18px';
      }};
      height: ${(props) => {
        if (props.isGenerating) return '42px';
        return '18px';
      }};
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;

    img {
      width: ${(props) => {
        if (props.isGenerating) return '36px';
        return '16px';
      }};
      height: ${(props) => {
        if (props.isGenerating) return '36px';
        return '16px';
      }};
    }
  }
`;

export const ErrorIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WarningIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ErrorToast = styled.div`
  position: fixed;
  width: 440px;
  height: 48px;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: #FFFFFF;
  border: 2px solid #F02B2B;
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
    background-color: #F02B2B;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
