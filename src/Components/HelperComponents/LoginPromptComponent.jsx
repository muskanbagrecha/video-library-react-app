import { useNavigate } from "react-router-dom";
export const LoginPromptComponent = ({page}) => {
  const navigate = useNavigate();
  return (
    <div className="row-container flex-col-center">
      <p>Please Login to View {page}</p>
      <button
        className="btn btn-primary margin-top-1rem"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};
