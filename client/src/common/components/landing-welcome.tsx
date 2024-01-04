'use client';

import { TypeAnimation } from 'react-type-animation';

export default function LandingWelcome() {
  return (
    <h1 className="text-8xl">
      Detect deepfakes with{' '}
      <span className="text-warning">
        <TypeAnimation
          sequence={['AI', 2000, 'Deep Learning', 2000, 'CNN', 2000]}
          wrapper="span"
          speed={25}
          repeat={Infinity}
        />
      </span>
    </h1>
  );
}
