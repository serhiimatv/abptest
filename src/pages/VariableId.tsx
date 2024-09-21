import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVariablesQuery } from "@/hooks/useVariablesQuery";
import style from "@/app.module.css";

const VariableId: FC = () => {
  const { variableID } = useParams();

  const { data, isLoading, isSuccess } = useVariablesQuery();

  //Викидається помилка для її обробки в ErrorBoundary
  useEffect(() => {
    if (
      data &&
      !data?.Results.some((variable) => variable.ID === Number(variableID))
    ) {
      throw Error;
    }
  }, [data]);

  return (
    <main className={style.main}>
      <section className={style.main_description}>
        {isLoading && <div className={style.loading}>Loading...</div>}
        {isSuccess &&
          data.Results.filter(
            (variable) => variable.ID === Number(variableID)
          ).map((variable) => (
            <div key={variable.ID}>
              <h1 className={style.main_header}>{variable.Name}</h1>
              <p dangerouslySetInnerHTML={{ __html: variable.Description }}></p>
            </div>
          ))}
      </section>
    </main>
  );
};

export default VariableId;
