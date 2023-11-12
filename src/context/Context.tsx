import { ReactNode, createContext, useMemo, useState } from 'react';
import { IAnime } from '../api/StartSearch';

type ContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: IAnime[];
  setData: React.Dispatch<React.SetStateAction<IAnime[]>>;
};

interface Props {
  children: ReactNode;
}

export const AppContext = createContext<ContextType>({
  value: '',
  setValue: () => {},
  data: [],
  setData: () => {},
});

function AnimeContextProvider({ children }: Props) {
  const [value, setValue] = useState(localStorage.getItem('test') ?? '');
  const [data, setData] = useState<IAnime[]>([]);

  const context = useMemo(
    () => ({ value, setValue, data, setData }),
    [data, value]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export default AnimeContextProvider;
