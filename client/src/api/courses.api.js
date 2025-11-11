import api from './axios';

export async function getCourses() {
  const { data } = await api.get('/courses');
  return data;
}

export async function updateCourseWeightage(courseId, body) {
  const { data } = await api.patch(`/admin/courses/${courseId}/weightage`, body);
  return data;
}