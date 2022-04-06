import { useContext } from "react";
import { HistoryContext } from "../Context/historyContext";

export const useHistory = () => useContext(HistoryContext);
