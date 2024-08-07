'use client';

import { EmptyCart } from '@/components/EmptyCart/EmptyCart';
import Loader from '@/components/Loader/Loader';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { GetCart } from '@/model/Cart';
import { CartApi } from '@/services/cart.service';
import { numberFormat } from '@/utils/numberFormat';
import { DeleteTwoTone, KeyboardBackspace } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Cart = () => {
  const [loading, setLoading] = useState(null);
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const { push } = useRouter();

  const {
    data,
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ['getCartProduct', user?.id],
    queryFn: () => CartApi.findCartByUserId({ userId: user?.id }),
    enabled: !!user,
  });

  if (authLoading || cartLoading) return <Loader />;

  if (data.carts.length === 0) {
    return <EmptyCart />;
  }

  const handleDelete = async (id: string, index: any) => {
    try {
      setLoading(index);
      await CartApi.removeItem(id);
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

  const goToProducts = () => {
    push('/');
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Button
          variant="text"
          startIcon={<KeyboardBackspace />}
          sx={{ textTransform: 'none' }}
          color="warning"
          size="large"
          onClick={goToProducts}
        >
          Voltar aos produtos
        </Button>
      </Grid>
      <Grid item xs={6}>
        {data?.carts?.map((item: GetCart, index: number) => (
          <Card key={item.id}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{ width: 150, height: 150 }}
                    src={`https://bucket-natura-s3.s3.amazonaws.com/${item.product.image}`}
                  />

                  <Box>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography variant="subtitle1">
                      {item.product.brand}
                    </Typography>
                    <Typography color="gray" fontSize={12}>
                      Qtde. {item.quantity}
                    </Typography>
                    <Typography
                      mt={2}
                      color="orange"
                      fontWeight="bold"
                      fontSize={20}
                    >
                      R$ {numberFormat(item.product.price)}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Tooltip title="Deletar do carrinho">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id, index)}
                    >
                      <DeleteTwoTone />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader title="Resumo do carrinho" />
          <Divider />
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                color: 'text.secondary',
              }}
            >
              Descontos (-): R$ {numberFormat(0)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                color: 'text.secondary',
              }}
            >
              Acréscimos (+): R$ {numberFormat(0)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Total (+): R$ {numberFormat(data.amountTotalProducts)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              fontSize={20}
              sx={{
                fontWeight: 'bold',
                color: 'green',
              }}
            >
              Sub-Total (+): R$ {numberFormat(data.amountTotalProducts)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
