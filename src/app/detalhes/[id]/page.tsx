'use client';

import { DetailsProduct } from '@/contents/DetailsProduct/DetailsProduct';
import { Box } from '@mui/material';

function DetailsProductScreen({ params }: { params: { id: string } }) {
  return (
    <Box mx={3} my={4}>
      <DetailsProduct id={params.id} />
    </Box>
  );
}

export default DetailsProductScreen;
