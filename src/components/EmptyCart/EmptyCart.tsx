import { Box, Typography } from '@mui/material';

import imageEmptyCart from '../../../public/empty-cart.svg';
import Image from 'next/image';

export const EmptyCart = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Image
        src={imageEmptyCart}
        alt="Empty cart natura"
        width={400}
        height={400}
      />
      <Typography
        variant="h3"
        sx={{
          mt: 2,
          fontWeight: 'bold',
          fontSize: '2rem',
          color: 'text.secondary',
          '@media (max-width:600px)': {
            fontSize: '1.5rem',
          },
        }}
      >
        Seu carrinho está vazio
      </Typography>
    </Box>
  );
};
