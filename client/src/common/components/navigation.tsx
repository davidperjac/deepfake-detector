'use client';

import { useContext } from 'react';

import {
  Link,
  Button,
  Navbar,
  NavbarItem,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

import { FaceIcon, GithubIcon } from '@/common/icons';
import { DeepfakeContext, NAVIGATION_ITEMS } from '@/helpers';
import ThemeSwitcher from '@/common/components/theme-switcher';

export default function Navigation() {
  const pathname = usePathname();
  const { onOpen } = useContext(DeepfakeContext);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand className="flex gap-2">
        <FaceIcon />
        <p className="font-bold text-inherit">Deepfake Detector</p>
      </NavbarBrand>
      <NavbarContent
        className="flex gap-4"
        justify="center"
      >
        {NAVIGATION_ITEMS.map(({ path, label }) => (
          <NavbarItem
            key={path}
            isActive={pathname === path}
          >
            <Link
              color={pathname === path ? 'warning' : 'foreground'}
              href={path}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            color="warning"
            variant="ghost"
            onClick={onOpen}
            className="font-bold"
          >
            ?
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            as={Link}
            color="warning"
            variant="ghost"
            href="https://github.com/davidperjac/deepfake-detector"
          >
            <GithubIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
