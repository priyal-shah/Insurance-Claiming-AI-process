import { createContext, useContext, useState } from "react";

const ResultContext = createContext(null);

export function ResultProvider({ children }) {
  const [result, setResult] = useState(null);

  const clearResult = () => setResult(null);

  return (
    <ResultContext.Provider value={{ result, setResult, clearResult }}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResult() {
  const ctx = useContext(ResultContext);
  if (!ctx) {
    throw new Error("useResult must be used within ResultProvider");
  }
  return ctx;
}
