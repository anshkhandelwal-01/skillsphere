import api from './axios';

export async function getPendingAssessments() {
  const { data } = await api.get('/assessments/pending');
  return data;
}

export async function startAttempt(assessmentId, answers = []) {
  const { data } = await api.post(`/assessments/${assessmentId}/attempt`, { answers });
  return data;
}