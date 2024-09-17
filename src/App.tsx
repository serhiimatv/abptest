import { FC, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import {
  DecryptedCodesContext,
  IContext,
} from "@/context/DecryptedCodesContext";
import styles from "@/app.module.css";

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
      <div className={styles.container}>
        <RouterProvider router={Router} />
      </div>
    </DecryptedCodesContext.Provider>
  );
};

export default App;
