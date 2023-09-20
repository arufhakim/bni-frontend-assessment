import { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [histories, setHistories] = useState([]);
  const values = { histories, setHistories };
  return (
    <HistoryContext.Provider value={values}>{children}</HistoryContext.Provider>
  );
};
