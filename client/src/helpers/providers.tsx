'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { DeepfakeProvider } from '@/helpers';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DeepfakeProvider>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </DeepfakeProvider>
  );
}
