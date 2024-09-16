import { FC, SyntheticEvent, useContext, useState } from "react";
import {
  checkCodesArrayLength,
  validateProhibitedSymbols,
  validateMaxSize,
} from "../utility";
import { useVinQuery } from "../hooks/useVinQuery";
import Result from "../components/Result";
import { DecryptedCodesContext } from "../context/DecryptedCodesContext";
import DecryptedCodes from "../components/DecryptedCodes";

const MAX_SIZE = 17;
const MAX_CODES_CONTAIN = 3;

const Home: FC = () => {
  const [vin, setVin] = useState("");
  const [validationError, setValidationError] = useState({
    maxSize: false,
    prohibitedSymbols: false,
  });

  const { codes, setCodes } = useContext(DecryptedCodesContext);

  const { refetch, error } = useVinQuery(vin);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    setValidationError({ maxSize: false, prohibitedSymbols: false });

    const validationErrorState = {
      maxSize: validateMaxSize(vin, MAX_SIZE),
      prohibitedSymbols: validateProhibitedSymbols(vin),
    };

    setValidationError(validationErrorState);
    if (
      validationErrorState.maxSize ||
      validationErrorState.prohibitedSymbols
    ) {
      return;
    }
    setCodes(checkCodesArrayLength(codes, vin, MAX_CODES_CONTAIN));

    refetch();
  };

  return (
    <>
      <section className="form__wrapper">
        <h1>Decode your VIN</h1>
        <form className="form">
          <input
            type="text"
            className="form__input"
            value={vin}
            onChange={(e) => {
              setValidationError({ maxSize: false, prohibitedSymbols: false });
              setVin(e.target.value);
            }}
          />
          <button onClick={handleClick}>Check VIN</button>
        </form>
        {validationError.maxSize && (
          <div className="form__error">
            VIN size must be less than 17 symbols
          </div>
        )}
        {validationError.prohibitedSymbols && (
          <div className="form__error">VIN included prohibited symbols</div>
        )}
        {error && <div className="form__error">{error.toString()}</div>}
      </section>
      <DecryptedCodes setVin={setVin} setValidationError={setValidationError} />
      <hr />
      <Result value={vin} />
    </>
  );
};

export default Home;
