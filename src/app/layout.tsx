'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components';
import { AuthProvider } from '@/context/AuthContext';
import './global.css';
import { SnackbarProvider } from 'notistack';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { Footer } from '@/components/Footer/Footer';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <title>Natura Brasil</title>
        <meta name="description" content="Challenge Natura" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SnackbarProvider
              maxSnack={6}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <CartDrawerProvider>
                <Header />
                {children}
                <Footer />
              </CartDrawerProvider>
            </SnackbarProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
