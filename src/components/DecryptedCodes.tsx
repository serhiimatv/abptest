import { Dispatch, useContext } from "react";
import { getDecryptedCodesFromHistory } from "@/utility";
import { useQueryClient } from "@tanstack/react-query";
import { DecryptedCodesContext } from "@/context/DecryptedCodesContext";

type DecryptedCodesProps = {
  setVin: Dispatch<React.SetStateAction<string>>;
  setValidationError: Dispatch<
    React.SetStateAction<{
      maxSize: boolean;
      prohibitedSymbols: boolean;
    }>
  >;
};

const DecryptedCodes = ({
  setVin,
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
            setVin(value);
          }}
        >
          {value}
        </button>
      ))}
    </section>
  );
};

export default DecryptedCodes;
