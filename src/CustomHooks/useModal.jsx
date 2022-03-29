import { useContext } from "react";
import { ModalContext } from "../Context/modalContext.jsx";

export const useModal = () => useContext(ModalContext);
