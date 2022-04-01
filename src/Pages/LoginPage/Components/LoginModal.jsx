import { LoginForm } from "./LoginForm";
import { Modal } from "../../../Components/UI/";
import { useModal } from "../../CustomHooks/";

export const LoginModal = () => {
  const { setShowModal } = useModal();
  const { showAlert, setShowAlert } = useAlert();

  const onReset = () => {
    setShowModal(false);
  };
  return (
    <Modal onReset={onReset}>
      <LoginForm onReset={onReset} classes="login-modal" />
    </Modal>
  );
};
