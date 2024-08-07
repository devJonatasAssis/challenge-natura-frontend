import { api } from './api.service';

interface User {
  name: string;
  email: string;
  password: string;
}

const save = async (payload: User) => {
  const response = await api.post('users', payload);
  return response.data;
};

export const UserApi = {
  save,
};
