import { createPortal } from "react-dom";
import { useModal } from "../../../CustomHooks/useModal";
import "./Modal.css";

const Backdrop = ({ onReset }) => {
  return <div className="backdrop" onClick={onReset} />;
};

const ModalOverlay = ({ modalClass, children }) => {
  const classes = "modal " + modalClass;
  return <div className={classes}>{children}</div>;
};

const Modal = ({ modalClass, children }) => {
  const { setShowModal } = useModal();
  return (
    <>
      {createPortal(
        <Backdrop onReset={() => setShowModal(false)} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <ModalOverlay modalClass={modalClass}>{children}</ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
