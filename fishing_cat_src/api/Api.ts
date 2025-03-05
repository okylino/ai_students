const url = import.meta.env.VITE_RESTFUL_API_DOMAIN;

export function getLessonInfo(data) {
  return fetch(`${url}/lessons/${data.lessonId}`);
}

export function getStudentInfo(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.studentId}`);
}

export function getQuiz(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.studentId}/quizzes`);
}

export function getTask(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.studentId}/tasks`);
}

export function getTool(data) {
  return fetch(`${url}/lessons/${data.lessonId}/tool`);
}

export function getPresignedUrl(data) {
  return fetch(`${url}/lessons/${data.lessonId}/resources`, {
    method: 'post',
    body: JSON.stringify({ type: data.type }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function saveTaskResult(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.studentId}/task_results`, { method: 'post' });
}

export function saveQuizResult(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.studentId}/quizzes`, { method: 'post' });
}

export function saveStudentQuizAnswer(data) {
  return fetch(`${url}/quizzes/${data.quizId}/quiz_results`, {
    method: 'put',
    body: JSON.stringify(data.body),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getLessonByRoom(data) {
  return fetch(`${url}/lessons?value=${data.value}&filter=${data.filter}&is_the_latest_one=true`);
}

export function updateTaskResult(data) {
  return fetch(`${url}/tasks/${data.taskId}/task_results`, {
    method: 'post',
    body: JSON.stringify(data.body),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function changeSeat(data) {
  return fetch(`${url}/lessons/${data.lessonId}/change_seat`, {
    method: 'post',
    body: JSON.stringify({ student_id: data.userId, seat_number: data.seatNumber }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function chooseSeat(data) {
  return fetch(`${url}/lessons/${data.lessonId}/choose_seat`, {
    method: 'post',
    body: JSON.stringify({ seat_number: data.seatNumber, sid: data.sid }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getPoints(data) {
  return fetch(`${url}/lessons/${data.lessonId}/students/${data.userId}/points`);
}

export function getClassRoomInfo(data) {
  return fetch(`${url}/rooms/${data.room_id}`);
}

export function getBackendVersion() {
  return fetch(`${url.split('/api/v2')[0]}`);
}

export function convertImg(data) {
  const formData = new FormData();
  formData.append('file', data);

  return fetch(`${url}/tools/convert_image`, {
    method: 'POST',
    body: formData,
  });
}
