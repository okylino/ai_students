export interface RoomLessonListResp {
  data: RoomLessonList[];
}

export interface RoomLessonList {
  roomId: string;
  roomNumber: string;
  roomDisplayName: string;
  lessonCount: number;
  lessonsInfo: LessonInfo[];
  limit: number;
}

export interface LessonInfo {
  lessonId: string;
  startTime: number;
  endTime: number;
  points: number;
  availableJoin: boolean;
  unreadAssignmentCount: number;
}
