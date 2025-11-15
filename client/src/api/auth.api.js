import api from './axios';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function register(email, password, name, role) {
  try {
    const { data } = await api.post('/auth/register', { email, password, name, role});
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }
  catch (error) {
    throw error;
  }
}

export async function changePassword(email, currentPassword, newPassword) {
  const { data } = await api.post('/auth/change-password', { email, currentPassword, newPassword });
  return data;
}