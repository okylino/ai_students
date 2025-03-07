import { Outlet } from 'react-router-dom';

import { DialogProvider } from '@fishing_cat/context/dialogContext/DialogContext'; // TODO: DialogProvider is not currently used but kept for future dialog refactoring.
import { TaskProvider } from '@fishing_cat/context/taskContext/TaskContext';
import useNoSleep from '@/hooks/useNoSleep';

/** The user provider and socket provider should be here */
const InClassLayout = () => {
  useNoSleep();

  return (
    <DialogProvider>
      <TaskProvider>
        <Outlet />
      </TaskProvider>
    </DialogProvider>
  );
};

export default InClassLayout;
