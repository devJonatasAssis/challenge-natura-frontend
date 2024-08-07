import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Loader from '../Loader/Loader';
import { numberFormat } from '@/utils/numberFormat';
import { Close, DeleteTwoTone } from '@mui/icons-material';
import { useState } from 'react';
import { CartApi } from '@/services/cart.service';
import { useToast } from '@/hooks/useToast';

interface Props {
  isCartOpen: boolean;
  closeCart: () => void;
}

export const Cart = ({ isCartOpen, closeCart }: Props) => {
  const [loading, setLoading] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  console.log('USER', user?.id);
  const { data, isLoading, refetch } = useCart(user?.id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) return <Loader />;

  const onRemove = async (id: string, index: number) => {
    try {
      setLoading(index);
      await CartApi.removeItem(id);

      toast({
        type: 'success',
        title: 'Item removido com sucesso.',
      });
      refetch();
    } catch (error) {
      toast({
        type: 'error',
        title: 'Não foi possível remover o item',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{ sx: { minWidth: isMobile ? '100%' : 500 } }}
    >
      <Box>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Minha sacola</Typography>
          <IconButton onClick={closeCart}>
            <Close />
          </IconButton>
        </Box>
        <Divider />

        <Box>
          {data.carts.map((item: any, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant="rounded"
                    alt={item.product.name}
                    src={`https://bucket-natura-s3.s3.amazonaws.com/${item.product.image}`}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="subtitle2">
                    {item.product.name}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="end">
                  {loading === index ? (
                    'Removendo...'
                  ) : (
                    <IconButton
                      id="delete"
                      name="delete"
                      onClick={() => onRemove(item.id, index)}
                    >
                      <DeleteTwoTone color="error" />
                    </IconButton>
                  )}

                  <Typography color="orange">
                    R$ {numberFormat(item.product.price)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />
            </Box>
          ))}

          <Box display="flex" justifyContent="end" px={2}>
            <Typography>
              Sub-total: R$ {numberFormat(data.amountTotalProducts)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
