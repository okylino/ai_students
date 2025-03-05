import React, { type PropsWithChildren, useMemo, useState } from 'react';

import { TaskDetails } from '@fishing_cat/components/pages/classroom/response/ResponseTask.type';

interface TaskContextType {
  task: TaskDetails[];
  setTask: React.Dispatch<React.SetStateAction<TaskDetails[]>>;
}

const TaskContext = React.createContext<TaskContextType>({
  task: [],
  setTask: () => {},
});

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [task, setTask] = useState<TaskDetails[]>([]);
  const value = useMemo(() => ({ task, setTask }), [task, setTask]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
