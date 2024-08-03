'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

import './global.css';

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
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
