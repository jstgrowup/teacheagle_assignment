import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const GLobalContextProvider = ({ children }) => {
  const [change, setchange] = useState(false);
  return (
    <GlobalContext.Provider value={{ change, setchange }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGLobalContext = () => useContext(GlobalContext);
