import { createContext, useState } from "react";

export const PromoContext = createContext();

export const PromoProvider = ({ children }) => {
  const [promos, setPromos] = useState([]);
  const [isReset, setIsReset] = useState(false);
  const [search, setSearch] = useState({
    search: "",
  });

  const handleSearch = () => {
    const filterPromo = promos.filter((promo) => {
      return promo.nama.toLowerCase().includes(search.search.toLowerCase());
    });

    setPromos([...filterPromo]);
  };

  const values = {
    promos,
    setPromos,
    search,
    setSearch,
    handleSearch,
    isReset,
    setIsReset,
  };
  return (
    <PromoContext.Provider value={values}>{children}</PromoContext.Provider>
  );
};
