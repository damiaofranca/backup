import { createContext } from "react";
import { AuthProps } from "./props";

export const Context = createContext<AuthProps>({} as AuthProps);

export default Context;
