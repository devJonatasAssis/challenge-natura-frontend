import Loader from '@/components/Loader/Loader';
import { NumberInput } from '@/components/NumberInput/NumberInput';
import { ProductApi } from '@/services/product.service';
import { numberFormat } from '@/utils/numberFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShoppingBag } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  quantity: yup
    .number()
    .min(1, 'A quantidade tem que ser no mínimo 1')
    .typeError('A quantidade deve ser um número'),
});

interface Props {
  id: string;
}

export const DetailsProduct = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getProductById'],
    queryFn: () => ProductApi.getProductById(id),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const {
    formState: { isValid, errors },
    trigger,
    register,
  } = form;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Typography>Error loading products</Typography>;
  }

  const addProductCart = async () => {
    try {
      setLoading(true);
      await trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        return;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Image
          alt="Imagem produto"
          src={product.image}
          width={500}
          height={500}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography fontSize={45}>{product.name}</Typography>
        <Typography fontSize={20} fontWeight={300} color="#ACACAC">
          {product.brand}
        </Typography>

        {product.isLaunch && (
          <Chip label="Lançamento" color="success" sx={{ mt: 1 }} />
        )}

        <Typography mt={5} mb={3} fontSize={35} fontWeight={700} color="orange">
          R$ {numberFormat(product.price)}
        </Typography>

        <Box display="flex">
          <NumberInput
            label="Quantidade"
            name="quantity"
            maxLength={10}
            register={register}
            variant="outlined"
            error={errors.quantity}
          />
          <LoadingButton
            loading={loading}
            startIcon={<ShoppingBag />}
            variant="contained"
            color="warning"
            sx={{ height: 55, ml: 3 }}
            onClick={addProductCart}
          >
            Adicionar
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};
