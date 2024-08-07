import { api } from './api.service';

interface Cart {
  productId: string;
  userId: string | undefined;
  quantity: number;
}

interface GetCartProps {
  userId: string | undefined;
}

const save = async (payload: Cart) => {
  const response = await api.post('cart', payload);
  return response.data;
};

const findCartByUserId = async ({ userId }: GetCartProps) => {
  const response = await api.get(`cart/${userId}`);

  return response.data;
};

const removeItem = async (id: string) => {
  const response = await api.delete(`cart/${id}`);
  return response.data;
};

export const CartApi = {
  save,
  findCartByUserId,
  removeItem,
};
