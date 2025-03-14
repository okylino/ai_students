import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AIChatProps, Message } from './AIChat.type';
import robotAvatar from '../../assets/assignment/robot.png';
import arrowUpIcon from '../../assets/assignment/Icon-arrow-up.png';
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
} from './AIChat.style';

export const AIChat: FC<AIChatProps> = ({ className }) => {
  const { t } = useTranslation('assignment');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set initial AI message when component mounts
    const initialMessage: Message = {
      id: Date.now().toString(),
      content: "Hello! I'm here to help you with your assignment. Feel free to ask me questions if you need help.",
      isAI: true,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  const suggestionQuestions = [
    'What is the significance of the Eucharist in the Catholic faith?',
    'How does the Protestant view of the Eucharist differ from the Catholic view?',
    'What role does the Protestant worship'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isAI: false,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    try {
      // Here you would normally make an API call to get the AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Hello! I'm here to help you with your assignment. Feel free to ask me questions if you need help.",
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ChatContainer className={className}>
      <Header>
        <div>
           {t('aiTeachingAssistant')}
        </div>
      </Header>
      
      <MessagesContainer>
        {messages.map((message) => (
          <StyledMessage key={message.id} isAI={message.isAI}>
            {message.isAI && <AIAvatar src={robotAvatar} alt="AI Assistant" />}
            <MessageBox isAI={message.isAI}>
              <MessageContent>
                {message.content}
              </MessageContent>
            </MessageBox>
            {!message.isAI && message.timestamp && (
              <Timestamp>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {new Date(message.timestamp).getHours() >= 12 ? 'PM' : 'AM'}
              </Timestamp>
            )}
          </StyledMessage>
        ))}
        {isLoading && (
          <StyledMessage isAI={true}>
            <AIAvatar src={robotAvatar} alt="AI Assistant" />
            <MessageBox isAI={true}>
              <MessageContent>
                <LoadingDots>
                  <Dot />
                  <Dot />
                  <Dot />
                </LoadingDots>
              </MessageContent>
            </MessageBox>
          </StyledMessage>
        )}
      </MessagesContainer>

      <BottomSection>
        <SuggestionsContainer>
          {suggestionQuestions.map((question, index) => (
            <SuggestionChip 
              key={index}
              onClick={() => setInput(question)}
            >
              {question}
            </SuggestionChip>
          ))}
        </SuggestionsContainer>

        <InputContainer>
          <MessageInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('Express your idea or thought...')}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <ScrollTopButton onClick={scrollToTop}>
            <img src={arrowUpIcon} alt="Scroll to top" />
          </ScrollTopButton>
        </InputContainer>
      </BottomSection>
    </ChatContainer>
  );
}; 