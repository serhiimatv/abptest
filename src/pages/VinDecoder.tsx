import { FC, SyntheticEvent, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkCacheLength,
  fetchVin,
  filteredData,
  getHistory,
  validateProhibitedSymbols,
  validateSize,
} from "../utility";

const VinDecoder: FC = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState({
    minSize: false,
    prohibitedSymbols: false,
  });

  const [cache, setCache] = useState<string[]>([]);

  const { data, refetch, isSuccess, isLoading, error } = useQuery({
    queryFn: () => fetchVin(value),
    queryKey: ["userVariable", value],
    enabled: false,
    select: filteredData,
  });

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
        <h1>Decode your vin</h1>
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
      <section className="result">
        <h2>Results</h2>
        {!data && <div>Input you VIN</div>}
        {isLoading && <div className="loading">Loading...</div>}
        {isSuccess &&
          data?.map((variable, idx) => (
            <div key={variable.Variable + idx}>
              <h2>{variable.Variable}</h2>
              <p>{variable.Value}</p>
            </div>
          ))}
      </section>
    </>
  );
};

export default VinDecoder;
