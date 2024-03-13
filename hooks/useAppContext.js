import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
