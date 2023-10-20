import React, { Dispatch, SetStateAction, createContext, useState, ReactNode } from 'react';
import { IOption } from './types';

export const SettingsContext = createContext<{
  settings: IOption[];
  setSettings: Dispatch<SetStateAction<IOption[]>>;
}>({ settings: [], setSettings: () => {} });

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<IOption[]>([]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
