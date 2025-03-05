export enum REMOVE_USER_ID_REASON {
  NO_ROOM_ID = 'no room ID',
  LESSON_NOT_EXIST = 'lesson not exist',
  ON_REMOVE_STUDENT = 'on remove student',
  REJOIN_SEAT_API_ERROR = 'rejoin seat API error',
  LOGIN_AFTER_CHOSEN_SEAT = 'login after chosen seat',
  GET_STUDENT_SEAT_API_ERROR = 'get student seat API error',
  NO_USER_ID = 'no user ID',
  STUDENT_HAS_NOT_JOINED = 'student has not joined',
}

export enum JOIN_REASON {
  VISIBILITY_CHANGE = 'visibility change',
  SAVE_STUDENT_INFO = 'save student info',
}

export enum LEAVE_REASON {
  LEAVE_LESSON = 'leave lesson',
  END_LESSON = 'end lesson',
  VISIBILITY_CHANGE = 'visibility change',
}
