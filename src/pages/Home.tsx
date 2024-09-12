import { FC, SyntheticEvent, useContext, useState } from "react";
import {
  checkCodesArrayLength,
  validateProhibitedSymbols,
  validateSize,
} from "../utility";
import { useVinQuery } from "../hooks/useVinQuery";
import Result from "../components/Result";
import { DecryptedCodesContext } from "../context/DecryptedCodesContext";
import DecryptedCodes from "../components/DecryptedCodes";

const Home: FC = () => {
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState({
    minSize: false,
    prohibitedSymbols: false,
  });

  const { codes, setCodes } = useContext(DecryptedCodesContext);

  const { refetch, error } = useVinQuery(value);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const validationErrorState = {
      minSize: validateSize(value),
      prohibitedSymbols: validateProhibitedSymbols(value),
    };

    setValidationError(validationErrorState);
    if (
      validationErrorState.minSize ||
      validationErrorState.prohibitedSymbols
    ) {
      return;
    }
    setCodes(checkCodesArrayLength(codes, value));

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
            value={value}
            onChange={(e) => {
              setValidationError({ minSize: false, prohibitedSymbols: false });
              setValue(e.target.value);
            }}
          />
          <button onClick={handleClick}>Check VIN</button>
        </form>
        {validationError.minSize && (
          <div className="form__error">VIN size must be 17 symbols</div>
        )}
        {validationError.prohibitedSymbols && (
          <div className="form__error">VIN included prohibited symbols</div>
        )}
        {error && <div className="form__error">{error.toString()}</div>}
      </section>
      <DecryptedCodes
        setValue={setValue}
        setValidationError={setValidationError}
      />
      <hr />
      <Result value={value} />
    </>
  );
};

export default Home;
