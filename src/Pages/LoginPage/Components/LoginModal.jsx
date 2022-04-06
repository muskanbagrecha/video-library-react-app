import { LoginForm } from "./LoginForm";
import { Modal } from "../../../Components/UI/";
import { usePlaylistModal } from "../../CustomHooks/";

export const LoginModal = () => {
  const { hideModal } = usePlaylistModal();
  return (
    <Modal>
      <LoginForm onReset={hideModal} classes="login-modal" />
    </Modal>
  );
};
