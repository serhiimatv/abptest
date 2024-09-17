import { FC } from "react";
import { stripHtmlTags } from "@/utility";
import { Link } from "react-router-dom";
import { useVariablesQuery } from "@/hooks/useVariablesQuery";
import styles from "@/app.module.css";

const Variables: FC = () => {
  const { data, isLoading, isSuccess } = useVariablesQuery();

  return (
    <main className={styles.main}>
      <h1 className={styles.main_header}>Variables</h1>
      <section className={styles.main_description}>
        {isLoading && <div className={styles.loading}>Loading...</div>}
        {isSuccess &&
          data.Results.map((variable) => (
            <div className={styles.main_description_wrapper} key={variable.ID}>
              <Link to={`/variables/${variable.ID}`}>
                <h2 className={styles.main_description_header}>
                  {variable.Name}
                </h2>
              </Link>
              <p className="main__description-text">
                {stripHtmlTags(variable.Description)}
              </p>
            </div>
          ))}
        {isSuccess && data.Results.length === 0 && (
          <div>No variables found.</div>
        )}
      </section>
    </main>
  );
};

export default Variables;
