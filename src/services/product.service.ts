import { api } from './api.service';

interface FilterListProps {
  name?: string;
  take?: number;
  page?: number;
}

const listProducts = async ({ name, page, take }: FilterListProps) => {
  const response = await api.get('products', {
    params: {
      name,
      page,
      take,
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
