import { FC } from "react";
import { useParams } from "react-router-dom";
import { stripHtmlTags } from "../utility";
import { useVariablesQuery } from "../hooks/useVariablesQuery";

const DefiniteVariable: FC = () => {
  const { variableID } = useParams();

  const { data, isLoading, isSuccess, isError } = useVariablesQuery();

  return (
    <main className="main">
      <section className="main__description">
        {isError && <div className="main__error">Some Error happened</div>}
        {isLoading && <div className="loading">Loading...</div>}
        {isSuccess &&
          data.Results.map((variable) => {
            if (variable.ID === Number(variableID)) {
              return (
                <div key={variable.ID}>
                  <h1 className="main__header">{variable.Name}</h1>
                  <p>{stripHtmlTags(variable.Description)}</p>
                </div>
              );
            }
          })}
      </section>
    </main>
  );
};

export default DefiniteVariable;
