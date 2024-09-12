import { FC } from "react";
import { useVinQuery } from "../hooks/useVinQuery";

interface IProps {
  value: string;
}

const Result: FC<IProps> = ({ value }) => {
  const { data, isSuccess, isLoading } = useVinQuery(value);

  return (
    <section className="result">
      <h2>Results</h2>
      {!data && <div>Input and check your VIN</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {isSuccess &&
        data?.map((variable, idx) => (
          <div key={variable.Variable + idx}>
            <h3>{variable.Variable}</h3>
            <p>{variable.Value}</p>
          </div>
        ))}
    </section>
  );
};

export default Result;