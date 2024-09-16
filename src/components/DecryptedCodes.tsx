import { Dispatch, useContext } from "react";
import { getDecryptedCodesFromHistory } from "../utility";
import { useQueryClient } from "@tanstack/react-query";
import { DecryptedCodesContext } from "../context/DecryptedCodesContext";

type DecryptedCodesProps = {
  setValue: Dispatch<React.SetStateAction<string>>;
  setValidationError: Dispatch<
    React.SetStateAction<{
      maxSize: boolean;
      prohibitedSymbols: boolean;
    }>
  >;
};

const DecryptedCodes = ({
  setValue,
  setValidationError,
}: DecryptedCodesProps) => {
  const queryClient = useQueryClient();
  const { codes } = useContext(DecryptedCodesContext);

  return (
    <section className="decrypted-codes">
      <h2>Request history</h2>
      {getDecryptedCodesFromHistory(queryClient, codes).map((value, idx) => (
        <button
          key={value + idx}
          onClick={() => {
            setValidationError({ maxSize: false, prohibitedSymbols: false });
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
