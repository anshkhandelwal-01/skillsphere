import api from "./axios";

export async function getCoursesModules(courseId) {
  const { data } = await api.get(`/modules/${courseId}`);
  return data;
}

export async function addCourseModules(courseId, formData) {
  const { data } = await api.put(
    `/modules/${courseId}/add-material`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

export async function getModuleReadingMaterial(courseId, index) {
  const { data } = await api.get(`/modules/${courseId}/reading`, {
    params: { index },
  });
  return data;
}
