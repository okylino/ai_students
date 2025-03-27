import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { AIChatProps, Message } from './AIChat.type';
import robotAvatar from '../../assets/assignment/robot.png';
import arrowUpIcon from '../../assets/assignment/Icon-arrow-up.png';
import generateIcon from '../../assets/assignment/generate.png';
import warningIcon from '../../assets/assignment/Icon_Warning.png';
import {
  useGetChatRecordsQuery,
  useStartAITutorMutation,
  useChatWithAITutorMutation,
  useStopAITutorMutation,
  useEndAITutorMutation,
} from '@/api/services/assignmentService';
import {
  ChatContainer,
  Header,
  MessagesContainer,
  Message as StyledMessage,
  MessageBox,
  AIAvatar,
  MessageContent,
  Timestamp,
  SuggestionsContainer,
  SuggestionChip,
  InputContainer,
  MessageInput,
  ScrollTopButton,
  LoadingDots,
  Dot,
  BottomSection,
  ErrorToast,
  ErrorMessage,
  CloseButton,
  ErrorIconContainer,
  WarningIcon,
} from './AIChat.style';

export const AIChat: FC<AIChatProps> = ({ className, assignmentId, quizId, onClose }) => {
  const { t } = useTranslation('assignment');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lessonInsightId, setLessonInsightId] = useState<string | null>(null);
  const [lastSentMessage, setLastSentMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // RTK Query hooks
  const { data: chatRecords } = useGetChatRecordsQuery(
    { assignmentId, quizId, limit: 50, offset: 0 },
    { skip: !assignmentId || !quizId }
  );

  const [startAITutor] = useStartAITutorMutation();
  const [chatWithAITutor] = useChatWithAITutorMutation();
  const [stopAITutor] = useStopAITutorMutation();
  const [endAITutor] = useEndAITutorMutation();

  // Initialize chat session when component mounts
  useEffect(() => {
    const initializeChat = async () => {
      if (!assignmentId || !quizId || sessionId) {
        console.log('Initialization conditions not met:', {
          hasAssignmentId: !!assignmentId,
          hasQuizId: !!quizId,
          hasExistingSession: !!sessionId
        });
        return;
      }
      
      try {
        const newLessonInsightId = uuidv4();
        console.log('Starting AI tutor with:', {
          assignmentId,
          quizId,
          lessonInsightId: newLessonInsightId
        });

        const startResponse = await startAITutor({
          assignmentId,
          quizId,
          body: {
            lesson_insight_id: newLessonInsightId,
            chirp_id: uuidv4(),
          },
        }).unwrap();

        console.log('Start response:', startResponse);

        if (startResponse.data?.sessionId) {
          setSessionId(startResponse.data.sessionId);
          setLessonInsightId(newLessonInsightId);
          setSuggestions(startResponse.data.suggestions || []);
        } else {
          console.error('No session_id in response:', startResponse);
          setError(t('error.failedToStartChat'));
        }
      } catch (err) {
        console.error('Failed to start chat:', err);
        setError(t('error.failedToStartChat'));
      }
    };

    initializeChat();
  }, [assignmentId, quizId, t]);

  // Load chat history
  useEffect(() => {
    if (chatRecords?.data) {
      console.log('Loading chat history:', chatRecords.data);
      const formattedMessages = chatRecords.data.map((record) => ({
        id: uuidv4(),
        content: record.content,
        isAI: record.user === 'AI',
        timestamp: new Date(parseInt(record.timestamp) * 1000),
      }));
      setMessages(formattedMessages);
    }
  }, [chatRecords]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (assignmentId && sessionId) {
        endAITutor({ 
          assignmentId
        }).catch(console.error);
      }
    };
  }, [assignmentId, sessionId, endAITutor]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId || !lessonInsightId) {
      console.log('Send conditions not met:', { 
        hasInput: !!input.trim(), 
        isLoading, 
        hasSession: !!sessionId, 
        hasInsightId: !!lessonInsightId 
      });
      return;
    }

    const currentMessage = input.trim();
    
    try {
      setIsLoading(true);
      // 先保存消息，以便在需要时恢复
      setLastSentMessage(currentMessage);
      
      const userMessage: Message = {
        id: uuidv4(),
        content: currentMessage,
        isAI: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      const chatResponse = await chatWithAITutor({
        assignmentId,
        quizId,
        body: {
          lesson_insight_id: lessonInsightId,
          session_id: sessionId,
          request_id: uuidv4(),
          message: currentMessage,
        },
      }).unwrap();

      if (chatResponse.data.suggestions) {
        setSuggestions(chatResponse.data.suggestions);
      }

      if (chatResponse.data.chats) {
        const aiMessages = chatResponse.data.chats.map((chat) => ({
          id: uuidv4(),
          content: chat.content,
          isAI: true,
          timestamp: new Date(parseInt(chat.timestamp) * 1000),
        }));
        setMessages((prev) => [...prev, ...aiMessages]);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(t('error.failedToSendMessage'));
      // 发送失败时，恢复消息
      setInput(currentMessage);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopGeneration = async () => {
    if (!sessionId || !lessonInsightId) return;

    try {
      // 1. 立即更新 UI 状态
      setIsLoading(false);
      
      // 2. 恢复最后发送的消息到输入框
      if (lastSentMessage) {
        setInput(lastSentMessage);
      }
      
      // 3. 移除最后一组对话（用户消息和AI回复）
      setMessages((prev) => {
        // 从后往前找到最后一条用户消息的索引
        const lastUserMessageIndex = [...prev].reverse().findIndex(msg => !msg.isAI);
        if (lastUserMessageIndex === -1) return prev;
        
        // 因为是反转数组后的索引，需要转换为正向索引
        const removeFromIndex = prev.length - lastUserMessageIndex - 1;
        return prev.slice(0, removeFromIndex);
      });

      // 4. 显示停止中的提示
      setError(t('Stopping generation...'));

      // 5. 调用停止 API
      await stopAITutor({
        assignmentId,
        quizId,
        body: {
          lesson_insight_id: lessonInsightId,
          session_id: sessionId,
          request_id: uuidv4(),
        },
      }).unwrap();

      // 6. 更新成功提示
      setError(t('Message cancelled. You can modify and send again.'));
    } catch (err) {
      console.error('Failed to stop generation:', err);
      // 即使 API 调用失败，也保持 UI 状态的更新
      setError(t('Message cancelled. You can continue with your message.'));
    } finally {
      // 7. 清理状态
      setLastSentMessage(null);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer className={`${className} ai-chat-responsive`}>
      {error && (
        <ErrorToast>
          <ErrorIconContainer>
            <WarningIcon src={warningIcon} alt="Warning" />
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorIconContainer>
          <CloseButton onClick={handleCloseError} />
        </ErrorToast>
      )}
      
      <Header>
        <div>{t('aiTeachingAssistant')}</div>
        {onClose && <CloseButton onClick={onClose} />}
      </Header>

      <MessagesContainer>
        {messages.map((message) => (
          <StyledMessage key={message.id} isAI={message.isAI}>
            {message.isAI && <AIAvatar src={robotAvatar} alt='AI Assistant' />}
            <MessageBox isAI={message.isAI} isGenerating={false}>
              <MessageContent isAI={message.isAI}>{message.content}</MessageContent>
            </MessageBox>
            {message.timestamp && !message.isAI && (
              <Timestamp>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                {message.timestamp.getHours() >= 12 ? 'PM' : 'AM'}
              </Timestamp>
            )}
          </StyledMessage>
        ))}
        {isLoading && (
          <StyledMessage isAI={true}>
            <AIAvatar src={robotAvatar} alt='AI Assistant' />
            <MessageBox isAI={true} isGenerating={true}>
              <MessageContent isAI={true}>
                <LoadingDots>
                  <Dot />
                  <Dot />
                  <Dot />
                </LoadingDots>
              </MessageContent>
            </MessageBox>
          </StyledMessage>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <BottomSection>
        <SuggestionsContainer isLoading={isLoading}>
          {suggestions.map((suggestion, index) => (
            <SuggestionChip 
              key={index} 
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </SuggestionChip>
          ))}
        </SuggestionsContainer>

        <InputContainer>
          <MessageInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('Express your idea or thought...')}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <ScrollTopButton
            isActive={!!input.trim() && !isLoading}
            isGenerating={isLoading}
            onClick={isLoading ? handleStopGeneration : handleSend}
            disabled={!input.trim() && !isLoading}
          >
            <img
              src={isLoading ? generateIcon : arrowUpIcon}
              alt={isLoading ? t('Stop generating') : t('Send message')}
            />
          </ScrollTopButton>
        </InputContainer>
      </BottomSection>
    </ChatContainer>
  );
};
