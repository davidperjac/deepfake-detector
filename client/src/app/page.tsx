import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/react';

import LandingWelcome from '@/common/components/landing-welcome';

export default function HomePage() {
  return (
    <main className="flex min-h-screen gap-12 items-center justify-center p-24">
      <div className="flex flex-col gap-12 w-[55rem]">
        <h1 className="text-8xl">
          Detect deepfakes with
          <LandingWelcome />
        </h1>
        <h2 className="text-2xl">
          Deepfake detector built with Next.js, NextUI, and TensorFlow. Upload a
          photo, let the AI do its magic, and see if it is a deepfake! Stop the
          spread of misinformation and fake news, and help make the internet a
          safer place. Start detecting deepfakes today!
        </h2>
        <div className="flex gap-4 self-start">
          <Button
            as={Link}
            variant="solid"
            color="warning"
            href="/model"
          >
            Get Started
          </Button>
          <Button
            as={Link}
            variant="bordered"
            color="warning"
            href="/code"
          >
            See the code
          </Button>
        </div>
      </div>
      <Image
        priority
        width={600}
        height={600}
        src="/landing1.webp"
        alt="deepfake-detector-landing"
        className="rounded-xl drop-shadow-xl"
      />
    </main>
  );
}
