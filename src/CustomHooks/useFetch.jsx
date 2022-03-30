import { useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const serverCall = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.request(params);
      console.log("usefetch", res);
      setData(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, serverCall };
};
