import Image from 'next/image';
import product1 from '../../../public/product2.png';
import { Grid, Typography } from '@mui/material';

export const Banner = () => {
  return (
    <Grid
      container
      sx={{
        background: '#3b2b4d',
        px: 3,
        height: 575,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid item xs={6}>
        <Typography fontSize={60} color="#FFF" fontWeight={600}>
          NATURA BEM-ESTAR
        </Typography>
        <Typography color="#F8F8F8" fontWeight={100} fontSize={30}>
          Cuide-se com a gente.
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex">
        <Image src={product1} alt="Imagem do Banner inicial" />
      </Grid>
    </Grid>
  );
};
