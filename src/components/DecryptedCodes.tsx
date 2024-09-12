import { Dispatch, FC, useContext } from "react";
import { getDecryptedCodesFromHistory } from "../utility";
import { useQueryClient } from "@tanstack/react-query";
import { DecryptedCodesContext } from "../context/DecryptedCodesContext";

interface IProps {
  setValue: Dispatch<React.SetStateAction<string>>;
  setValidationError: Dispatch<
    React.SetStateAction<{
      minSize: boolean;
      prohibitedSymbols: boolean;
    }>
  >;
}

const DecryptedCodes: FC<IProps> = ({ setValue, setValidationError }) => {
  const queryClient = useQueryClient();
  const { codes } = useContext(DecryptedCodesContext);

  return (
    <section className="decrypted-codes">
      <h2>Request history</h2>
      {getDecryptedCodesFromHistory(queryClient, codes).map((value, idx) => (
        <button
          key={value + idx}
          onClick={() => {
            setValidationError({ minSize: false, prohibitedSymbols: false });
            setValue(value);
          }}
        >
          {value}
        </button>
      ))}
    </section>
  );
};

export default DecryptedCodes;
