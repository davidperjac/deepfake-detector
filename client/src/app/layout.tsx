import type { Metadata } from 'next';

import './globals.css';

import { Providers } from '@/helpers/providers';

import Navigation from '@/common/components/navigation';
import InfoModal from '@/common/components/info-modal';

import Favicon from '/public/favicon.ico';

export const metadata: Metadata = {
  title: 'Deepfake Detector',
  icons: [{ rel: 'icon', url: Favicon.src }],
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
