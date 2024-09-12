import { FC, SyntheticEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  checkCacheLength,
  getHistory,
  validateProhibitedSymbols,
  validateSize,
} from "../utility";
import { useVinQuery } from "../hooks/useVinQuery";
import Result from "../components/Result";

const Home: FC = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState({
    minSize: false,
    prohibitedSymbols: false,
  });

  const [cache, setCache] = useState<string[]>([]);

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
    setCache(checkCacheLength(cache, value));

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
            onChange={(e) => setValue(e.target.value)}
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
      <section className="cache-results">
        <h2>Request history</h2>
        {getHistory(queryClient, cache).map((value, idx) => (
          <button key={value + idx} onClick={() => setValue(value)}>
            {value}
          </button>
        ))}
      </section>
      <hr />
      <Result value={value} />
    </>
  );
};

export default Home;
