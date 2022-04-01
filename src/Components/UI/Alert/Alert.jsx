import { useAlert } from "../../../CustomHooks/";
import "./Alert.css";
export const Alert = () => {
  const {
    showAlert: { alertMessage, type },
  } = useAlert();
  const alertClass = `alert-${type}`;

  return (
    <div className={`alert ${alertClass}`}>
      <span>
        {type === "danger" ? (
          <i className="fa-solid fa-diamond-exclamation"></i>
        ) : (
          <i className="fa-solid fa-check"></i>
        )}
      </span>
      <span>{alertMessage}</span>
    </div>
  );
};
