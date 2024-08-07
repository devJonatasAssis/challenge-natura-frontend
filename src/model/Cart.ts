export interface GetCart {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    brand: string;
    image: string;
    price: number;
  };
}
