import { TaskMarkingMessage } from '@fishing_cat/socket/models/task';

import { TaskDetails } from './ResponseTask.type';

export interface ResponseProps {
  setResponse: (isResponse: boolean) => void;
  markingTask: (params: TaskMarkingMessage) => void;
  markingTaskMsg?: TaskMarkingMessage;
}

export interface HistoryProps {
  task: TaskDetails[];
}

export type ToolButtonProps = {
  $active: boolean;
};
