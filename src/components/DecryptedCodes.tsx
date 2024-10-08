import { Dispatch, useContext } from "react";
import { DecryptedCodesContext } from "@/context/DecryptedCodesContext";
import styles from "@/app.module.css";

interface DecryptedCodesProps {
  setVin: Dispatch<React.SetStateAction<string>>;
}

const DecryptedCodes = ({ setVin }: DecryptedCodesProps) => {
  const { codes } = useContext(DecryptedCodesContext);

  return (
    <section className={styles.decrypted_codes}>
      <h2>Request history</h2>
      {codes.length === 0 ? <p>You check nothing</p> : null}
      {codes.map((value, idx) => (
        <button
          key={`${value}-${idx}`}
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
