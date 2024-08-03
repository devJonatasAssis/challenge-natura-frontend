import { CardProducts } from '@/components/CardProducts/CardProducts';
import Loader from '@/components/Loader/Loader';
import { ProductApi } from '@/services/product.service';
import { Tune } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const ListProducts = () => {
  const router = useRouter();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getProducts'],
    queryFn: () => ProductApi.listProducts(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Typography>Error loading products</Typography>;
  }

  const goToDetails = (id: string) => {
    router.push(`/detalhes/${id}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        mb={5}
      >
        <Typography fontWeight={700} fontSize={30}>
          Descubra o que combina com você
        </Typography>
        <Typography width={600} textAlign="center" mt={1}>
          nosso jeito único de criar fragrâncias combina arte, ciência, natureza
          e tecnologia em criações exclusivas para sentir nossa perfumaria na
          pele por muito mais tempo.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography fontWeight={800} fontSize={30}>
          15 resultados encontrados
        </Typography>
      </Grid>

      <Grid item xs={12} my={3}>
        <Button
          startIcon={<Tune />}
          variant="contained"
          sx={{ borderRadius: 10, textTransform: 'inherit' }}
          color="warning"
          size="large"
        >
          exibir filtros
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {products.map((item: any) => (
            <>
              <Grid item xs={3}>
                <CardProducts
                  props={item}
                  onClick={() => goToDetails(item.id)}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
