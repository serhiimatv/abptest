import { useVinQuery } from "@/hooks/useVinQuery";
import styles from "@/app.module.css";

type ResultProps = {
  value: string;
};

const Result = ({ value }: ResultProps) => {
  const { data, isSuccess, isLoading } = useVinQuery(value);

  return (
    <section className={styles.result}>
      <h2>Results</h2>
      {!data && (
        <div className={styles.result_check}>Input and check your VIN</div>
      )}
      {isLoading && <div className={styles.loading}>Loading...</div>}
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
