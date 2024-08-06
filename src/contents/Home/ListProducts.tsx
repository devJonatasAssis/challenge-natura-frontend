import { CardProducts } from '@/components/CardProducts/CardProducts';
import Loader from '@/components/Loader/Loader';
import { ProductApi } from '@/services/product.service';
import { FilterList, Tune } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const ListProducts = () => {
  const [visibleFilter, setVisibleFilter] = useState(false);
  const router = useRouter();

  const formFilter = useForm();

  const { register, handleSubmit, watch } = formFilter;

  const name = watch('name');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['getProducts'],
    queryFn: () => ProductApi.listProducts({ name }),
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

  const onVisibleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };

  const onFilter = () => {
    refetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={5}
        px={2}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: 24, md: 30 }}
          textAlign="center"
        >
          Descubra o que combina com você
        </Typography>
        <Typography width={{ xs: '100%', md: 600 }} textAlign="center" mt={1}>
          nosso jeito único de criar fragrâncias combina arte, ciência, natureza
          e tecnologia em criações exclusivas para sentir nossa perfumaria na
          pele por muito mais tempo.
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography fontWeight={800} fontSize={{ xs: 24, md: 30 }}>
          {data.total === 1
            ? `${data.total} resultado encontrado`
            : `${data.total} resultados encontrados`}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        my={3}
      >
        <Button
          startIcon={<Tune />}
          variant="contained"
          sx={{ borderRadius: 10, textTransform: 'inherit' }}
          color="warning"
          size="large"
          onClick={onVisibleFilter}
        >
          exibir filtros
        </Button>
      </Grid>

      {visibleFilter ? (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onFilter)}>
                <TextField
                  label="Nome"
                  fullWidth
                  color="warning"
                  {...register('name')}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  startIcon={<FilterList />}
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Filtrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {data.products?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardProducts props={item} onClick={() => goToDetails(item.id)} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="contained"
            color="warning"
          >
            {isFetchingNextPage ? 'Carregando mais...' : 'Ver mais'}
          </Button>
        )}
      </Grid> */}
    </Grid>
  );
};
