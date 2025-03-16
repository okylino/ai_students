import styled, { keyframes } from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 828px;
  height: 504px;
  border-radius: var(--vsx-radius-400);
  justify-content: space-between;
  background-color: #f8f9fa;
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
`;

export const AIAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  margin-right: 16px;
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
`;

export const ScrollTopButton = styled.button<{ isActive?: boolean; isGenerating?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.isGenerating) return '#cfcfcf';
    return props.isActive ? '#2e2eb2' : '#cfcfcf';
  }};
  border: 1px solid #dee2e6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;

  &:hover {
    background-color: ${(props) => {
      if (props.isGenerating) return '#cfcfcf';
      return props.isActive ? '#2e2eb2' : '#cfcfcf';
    }};
  }
  &:active {
    background-color: ${(props) => (props.isGenerating ? '#cfcfcf' : '#040a6b')};
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
  }
`;
