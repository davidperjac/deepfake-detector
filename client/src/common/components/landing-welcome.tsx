'use client';

import { TypeAnimation } from 'react-type-animation';

export default function LandingWelcome() {
  return (
    <span className="text-warning text-8xl">
      {' '}
      <TypeAnimation
        sequence={['AI', 2000, 'Deep Learning', 2000, 'CNN', 2000]}
        wrapper="span"
        speed={25}
        repeat={Infinity}
      />
    </span>
  );
}
