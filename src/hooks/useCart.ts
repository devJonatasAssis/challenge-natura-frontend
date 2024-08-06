import { CartApi } from '@/services/cart.service';
import { useQuery } from '@tanstack/react-query';

export const useCart = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['getCart'],
    queryFn: () => CartApi.findCartByUserId(userId),
  });
};
