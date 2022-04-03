import { useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const serverCall = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.request(params);
      setData(res?.data);
    } catch (error) {
      console.log(error.response);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, serverCall };
};
