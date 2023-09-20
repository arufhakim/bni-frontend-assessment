import { createContext, useState } from "react";

export const PromoContext = createContext();

export const PromoProvider = ({ children }) => {
  const [promos, setPromos] = useState([]);
  const values = { promos, setPromos };
  return (
    <PromoContext.Provider value={values}>{children}</PromoContext.Provider>
  );
};
