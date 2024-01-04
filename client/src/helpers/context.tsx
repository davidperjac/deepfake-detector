import { createContext } from 'react';

import { useDisclosure } from '@nextui-org/react';

interface DeepfakeContextData {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

interface DeepfakeProviderProps {
  children: React.ReactNode;
}

export const DeepfakeContext = createContext<DeepfakeContextData>(
  {} as DeepfakeContextData
);

export const DeepfakeProvider = ({ children }: DeepfakeProviderProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <DeepfakeContext.Provider value={{ isOpen, onOpen, onOpenChange }}>
      {children}
    </DeepfakeContext.Provider>
  );
};
