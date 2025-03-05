import { LessonByRoomFilter } from '@fishing_cat/enums/lessonByRoomFilterEnum';

export interface LessonByRoomReq {
  value: string;
  filter: LessonByRoomFilter;
}
