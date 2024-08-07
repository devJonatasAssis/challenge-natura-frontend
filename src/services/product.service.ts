import { api } from './api.service';

interface FilterListProps {
  name?: string;
  take?: number;
  skip?: number;
}

const listProducts = async ({ name, skip = 0, take = 10 }: FilterListProps) => {
  const response = await api.get('products', {
    params: {
      name,
      skip,
      take,
    },
  });

  return {
    products: response.data.products,
    nextCursor: response.data.nextCursor,
    total: response.data.total,
  };
};

const getProductById = async (id: string) => {
  const response = await api.get(`products/${id}`);
  return response.data;
};

export const ProductApi = {
  listProducts,
  getProductById,
};
