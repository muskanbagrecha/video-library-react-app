import { LoginForm } from "./Components/LoginForm";
import { useAuth } from "../../CustomHooks";
import { useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const navigate = useNavigate();
  return (
    <div className="sub-container">
      <LoginForm />
    </div>
  );
};
