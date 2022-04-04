import { createContext, useState } from "react";
import { useFetch } from "../CustomHooks";
import { useEffect } from "react";
export const HistoryContext = createContext([]);

export const HistoryProvider = ({ children }) => {
  const { data: historyResponse, serverCall: historyServerCall } = useFetch();

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

  useEffect(() => {
    if (historyResponse != null && historyResponse.history) {
      setHistory(historyResponse.history);
    } else if (token) {
      getFromHistory({
        token,
      });
    }
  }, [historyResponse]);

  const addToHistory = ({ video, token }) => {
    historyServerCall({
      method: "post",
      url: "/api/user/history",
      data: { video },
      headers: { authorization: token },
    });
  };

  const getFromHistory = ({ token }) => {
    historyServerCall({
      method: "get",
      url: "/api/user/history",
      headers: { authorization: token },
    });
  };

  const deleteFromHistory = ({ _id, token }) => {
    historyServerCall({
      method: "delete",
      url: `/api/user/history/${_id}`,
      headers: { authorization: token },
    });
  };

  const deleteAllFromHistory = ({ token }) => {
    historyServerCall({
      method: "delete",
      url: `/api/user/history/all`,
      headers: { authorization: token },
    });
  };

  const [history, setHistory] = useState([]);
  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        getFromHistory,
        deleteFromHistory,
        deleteAllFromHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
