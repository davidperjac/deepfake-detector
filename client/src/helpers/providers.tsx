'use client';

import { NextUIProvider } from '@nextui-org/react';

import { DeepfakeProvider } from '@/helpers';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DeepfakeProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </DeepfakeProvider>
  );
}
