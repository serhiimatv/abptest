import { FC } from "react";
import { stripHtmlTags } from "../utility";
import { Link } from "react-router-dom";
import { useVariablesQuery } from "../hooks/useVariablesQuery";

const Variables: FC = () => {
  const { data, isLoading, isSuccess } = useVariablesQuery();

  return (
    <main className="main">
      <h1 className="main__header">Variables</h1>
      <section className="main__description">
        {isLoading && <div className="loading">Loading...</div>}
        {isSuccess &&
          data.Results.map((variable) => (
            <div className="main__description-wrapper" key={variable.ID}>
              <Link to={`/variables/${variable.ID}`}>
                <h2 className="main__description-header">{variable.Name}</h2>
              </Link>
              <p className="main__description-text">
                {stripHtmlTags(variable.Description)}
              </p>
            </div>
          ))}
        {isSuccess && data.Results.length === 0 && (
          <div className="main__no-data">No variables found.</div>
        )}
      </section>
    </main>
  );
};

export default Variables;
