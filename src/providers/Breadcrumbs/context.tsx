import { createContext } from "react";
import { BreadcrumbsProps } from "./props";

export const Context = createContext<BreadcrumbsProps>({} as BreadcrumbsProps);

export default Context;
