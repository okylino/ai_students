import { createContext, type Dispatch, type ReactNode, type SetStateAction, useMemo, useState } from 'react';

interface LessonContextType {
  lessonId: string;
  setLessonId: Dispatch<SetStateAction<string>>;
  lessonStatus: string;
  setLessonStatus: Dispatch<SetStateAction<string>>;
}

const LessonContext = createContext<LessonContextType>({
  lessonId: '',
  setLessonId: () => {},
  lessonStatus: '',
  setLessonStatus: () => {},
});

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [lessonId, setLessonId] = useState('');
  const [lessonStatus, setLessonStatus] = useState('');

  const value = useMemo(() => ({ lessonId, setLessonId, lessonStatus, setLessonStatus }), [lessonId, lessonStatus]);

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};

export default LessonContext;
