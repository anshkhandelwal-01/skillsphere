import api from './axios';

export async function getCoursesModules(courseId) {
    const {data} = await api.get(`/modules/${courseId}`);
    return data;
}

export async function addCourseModules(courseId, type, title, url, assignment){
    const {data} = await api.put(`/modules/${courseId}/add-material`, {
        type,
        title,
        url,
        assignment
    });
    return data;
}