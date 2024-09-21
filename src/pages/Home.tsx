import { SyntheticEvent, useContext, useState } from "react";
import Result from "@/components/Result";
import DecryptedCodes from "@/components/DecryptedCodes";
import { useVinQuery } from "@/hooks/useVinQuery";
import { DecryptedCodesContext } from "@/context/DecryptedCodesContext";
import {
  checkCodesArrayLength,
  validateProhibitedSymbols,
  validateMaxSize,
} from "@/utility";
import { MAX_CODES_CONTAIN, MAX_SIZE } from "@/constants";
import styles from "@/app.module.css";

interface ValidationError {
  maxSize: boolean;
  prohibitedSymbols: boolean;
}

const Home = () => {
  const [vin, setVin] = useState("");
  const [validationError, setValidationError] = useState<ValidationError>({
    maxSize: false,
    prohibitedSymbols: false,
  });

  const { codes, setCodes } = useContext(DecryptedCodesContext);

  const { refetch, error } = useVinQuery(vin);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    setValidationError({ maxSize: false, prohibitedSymbols: false });

    if (!vin) return;

    const validationErrorState: ValidationError = {
      maxSize: validateMaxSize(vin, MAX_SIZE),
      prohibitedSymbols: validateProhibitedSymbols(vin),
    };

    setValidationError(validationErrorState);
    if (
      !validationErrorState.maxSize &&
      !validationErrorState.prohibitedSymbols
    ) {
      setCodes(checkCodesArrayLength(codes, vin, MAX_CODES_CONTAIN));

      refetch();
    }
  };

  return (
    <main>
      <section className={styles.form_wrapper}>
        <h1>Decode your VIN</h1>
        <form className={styles.form}>
          <input
            type="text"
            className={styles.form_input}
            value={vin}
            onChange={(e) => {
              setValidationError({
                maxSize: false,
                prohibitedSymbols: false,
              });
              setVin(e.target.value);
            }}
          />
          <button onClick={handleClick} className={styles.from_button}>
            Check VIN
          </button>
        </form>
        <div
          className={
            validationError.maxSize
              ? styles.form_error
              : styles.form_error_transparent
          }
        >
          VIN size must be less than 17 symbols
        </div>
        <div
          className={
            validationError.prohibitedSymbols
              ? styles.form_error
              : styles.form_error_transparent
          }
        >
          VIN included prohibited symbols
        </div>
        <div
          className={error ? styles.form_error : styles.form_error_transparent}
        >
          {error === null ? "error" : error.toString()}
        </div>
      </section>
      <DecryptedCodes setVin={setVin} />
      <Result vin={vin} />
    </main>
  );
};

export default Home;
