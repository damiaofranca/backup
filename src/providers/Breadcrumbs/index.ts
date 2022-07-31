import { useContext } from "react";
import Context from "./context";
export { default } from "./provider";

export const useBreadcrumbs = () => {
  return useContext(Context);
};
