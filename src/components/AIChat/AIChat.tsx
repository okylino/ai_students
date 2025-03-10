import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AIChatProps, Message } from './AIChat.type';

export const AIChat: FC<AIChatProps> = ({ className }) => {
  const { t } = useTranslation('practiceZone');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isAI: false,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className={className}>
      <div>
        <h3>{t('aiTeachingAssistant')}</h3>
        <div>
          {messages.map((message) => (
            <div key={message.id}>
              {message.content}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('typeYourMessage')}
        />
        <button onClick={handleSend}>{t('send')}</button>
      </div>
    </div>
  );
}; 