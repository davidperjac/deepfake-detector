import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Providers } from '@/helpers/providers';

import Navigation from '@/common/components/navigation';
import InfoModal from '@/common/components/info-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deepfake Detector',
  description:
    'Deepfake detector built with Next.js, NextUI, and TensorFlow.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark font-sohne bg-default-100"
    >
      <body>
        <Providers>
          <InfoModal />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
