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
      <Backdrop onReset={() => setShowModal(false)} />,
      <ModalOverlay modalClass={modalClass}>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
