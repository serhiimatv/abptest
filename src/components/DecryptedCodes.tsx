import { Dispatch, useContext } from "react";
import { getDecryptedCodesFromHistory } from "@/utility";
import { useQueryClient } from "@tanstack/react-query";
import { DecryptedCodesContext } from "@/context/DecryptedCodesContext";
import styles from "@/app.module.css";

type DecryptedCodesProps = {
  setVin: Dispatch<React.SetStateAction<string>>;
};

const DecryptedCodes = ({ setVin }: DecryptedCodesProps) => {
  const queryClient = useQueryClient();
  const { codes } = useContext(DecryptedCodesContext);

  return (
    <section className={styles.decrypted_codes}>
      <h2>Request history</h2>
      {getDecryptedCodesFromHistory(queryClient, codes).map((value, idx) => (
        <button
          key={value + idx}
          onClick={() => {
            setVin(value);
          }}
        >
          {value}
        </button>
      ))}
    </section>
  );
};

export default DecryptedCodes;
