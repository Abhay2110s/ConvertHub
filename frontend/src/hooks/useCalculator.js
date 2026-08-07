import { useState, useEffect } from "react";

export default function useCalculator(calculateFn, dependencies = []) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await calculateFn();
        if (isMounted) setResult(res);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (calculateFn) run();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, reset };
}
