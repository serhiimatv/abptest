import { useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import {
  DecryptedCodesContext,
  IContext,
} from "@/context/DecryptedCodesContext";
import styles from "@/app.module.css";

const App = () => {
  const [codes, setCodes] = useState<string[]>([]);

  const contextValue = useMemo<IContext>(
    () => ({
      codes,
      setCodes,
    }),
    [codes]
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
