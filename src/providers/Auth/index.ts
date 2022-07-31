import { useContext } from "react";
import Context from "./context";
export { default } from "./provider";

export const useAuth = () => {
  return useContext(Context);
};

export * from './props';
