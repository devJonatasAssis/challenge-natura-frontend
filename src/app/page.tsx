'use client';

import { Header } from '@/components';
import { Banner } from '@/components/Banner/Banner';
import { ListProducts } from '@/contents/Home/ListProducts';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Image from 'next/image';

const query = new QueryClient();

export default function Home() {
  return (
    <>
      <Banner />
      <Box sx={{ mt: 3, mx: 3 }}>
        <ListProducts />
      </Box>
    </>
  );
}
