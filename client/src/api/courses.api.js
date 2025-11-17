import api from './axios';

export async function getCourses() {
  const { data } = await api.get('/courses');
  return data;
}

export async function updateCourseWeightage(courseId, body) {
  const { data } = await api.patch(`/admin/courses/${courseId}/weightage`, body);
  return data;
}

export async function createCourse(title, description, category, roleTarget, level, durationMinutes, format, instructor, featured, isLegacyProcess, weightage) {
  const {data} = await api.post('/admin/add-courses',{
    title, description, category, roleTarget, level, durationMinutes, format, instructor, featured, isLegacyProcess, weightage
  })
  return data;
}

export async function deleteCourse(title) {
  const { data } = await api.post('/admin/delete-course', { title });
  return data;
}