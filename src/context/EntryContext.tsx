// context/EntryContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Ingredient = {
  name: string;
  local: string;
};

type EntryData = {
  name?: string;
  picture?: string | null;
  audio?: string | null;
  entry_text?: string;
  category?: string;
  estimated_time?: string;
  difficulty_level?: string;
  ingredients?: Ingredient[];
};

type EntryContextType = {
  data: EntryData;
  setData: (newData: Partial<EntryData>) => void;
  reset: () => void;
};

const EntryContext = createContext<EntryContextType>({} as EntryContextType);

export const EntryProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setState] = useState<EntryData>({});

  const setData = (newData: Partial<EntryData>) => {
    setState((prev) => ({ ...prev, ...newData }));
  };

  const reset = () => setState({});

  return (
    <EntryContext.Provider value={{ data, setData, reset }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = () => useContext(EntryContext);