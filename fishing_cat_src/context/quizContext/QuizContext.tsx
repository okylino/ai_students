import React, { ReactNode } from 'react';

import { QuizContextData } from '@fishing_cat/components/pages/classroom/quiz/Quiz.type';

// TODO: 目前只把 tranlation tool 需要的資料放在 context
// 未來可以評估把整個 quiz 的 data 一起整合(目前是多個 useState 且 props 一層一層傳遞)，看是要整個拉到 context 或是 redux
const defaultQuizData: QuizContextData = {
  enableTranslation: false,
  sourceType: '',
  questionTitle: '',
  optionList: [],
};

const QuizContext = React.createContext(defaultQuizData);

interface QuizProviderProps {
  children: ReactNode;
  quizData: QuizContextData;
}

export const QuizProvider = ({ children, quizData }: QuizProviderProps) => (
  <QuizContext.Provider value={quizData}>{children}</QuizContext.Provider>
);

export default QuizContext;
