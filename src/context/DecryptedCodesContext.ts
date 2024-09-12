import { createContext } from "react";

export interface IContext {
  codes: string[];
  setCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DecryptedCodesContext = createContext<IContext>({} as IContext);
