'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components';
import { AuthProvider } from '@/context/AuthContext';
import './global.css';

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
            <Header />
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
