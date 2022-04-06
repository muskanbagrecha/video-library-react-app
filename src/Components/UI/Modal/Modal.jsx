import { usePlaylistModal } from "../../../CustomHooks/usePlaylistModal";
import "./Modal.css";

const Backdrop = ({ onReset }) => {
  return <div className="backdrop" onClick={onReset} />;
};

const ModalOverlay = ({ modalClass, children }) => {
  const classes = `modal ${(modalClass ? modalClass : "")}`;
  return <div className={classes}>{children}</div>;
};

const Modal = ({ modalClass, children }) => {
  const { hideModal } = usePlaylistModal();
  return (
    <>
      <Backdrop onReset={() => hideModal()} />,
      <ModalOverlay modalClass={modalClass}>{children}</ModalOverlay>
    </>
  );
};

export { Modal };
