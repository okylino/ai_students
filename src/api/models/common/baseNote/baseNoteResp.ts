export interface BaseNoteResp {
  data: Partial<Note>;
}

interface Note {
  noteId: string;
  note: string;
}

export interface BaseUpdateNoteResp {
  data: {
    noteId: string;
    resourceId: string;
    resourceType: string;
    userId: string;
    note: string;
  };
}
