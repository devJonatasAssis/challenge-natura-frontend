import { api } from './api.service';

const listProducts = async (category?: string) => {
  const response = await api.get('products', {
    params: {
      category,
    },
  });

  return response.data;
};

const getProductById = async (id: string) => {
  const response = await api.get(`products/${id}`);
  return response.data;
};

export const ProductApi = {
  listProducts,
  getProductById,
};
