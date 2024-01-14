'use client';

import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { DarkIcon, LightIcon } from '@/common/icons';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      color="warning"
      variant="ghost"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
}
