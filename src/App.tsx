import { FC, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import {
  DecryptedCodesContext,
  IContext,
} from "@/context/DecryptedCodesContext";

const App: FC = () => {
  const [codes, setCodes] = useState<string[]>([] as string[]);

  const contextValue = useMemo<IContext>(
    () => ({
      codes: codes,
      setCodes: setCodes,
    }),
    [codes, setCodes]
  );

  return (
    <DecryptedCodesContext.Provider value={contextValue}>
      <RouterProvider router={Router} />
    </DecryptedCodesContext.Provider>
  );
};

export default App;
