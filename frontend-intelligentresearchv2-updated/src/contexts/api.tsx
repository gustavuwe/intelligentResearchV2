"use client";
import { createContext, useState } from "react";

type ApiContextType = {
  revalidateQuery: (path: string) => void;
  registerQuery: (path: string, refetch: () => void) => void;
};

export const ApiContext = createContext<ApiContextType>({
  revalidateQuery: () => {},
  registerQuery: () => {},
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queries, setQueries] = useState<{ [key: string]: () => void }>({});

  const revalidateQuery = (path: string) => {
    if (queries[path]) {
      queries[path]();
    }
  };

  const registerQuery = (path: string, refetch: () => void) => {
    setQueries((prev) => ({ ...prev, [path]: refetch }));
  };

  return (
    <ApiContext.Provider value={{ revalidateQuery, registerQuery }}>
      {children}
    </ApiContext.Provider>
  );
};
