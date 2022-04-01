import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useModal, useAuth, useAlert, useFetch } from "../../../CustomHooks/";
import { Alert } from "../../../Components/UI/";
import axios from "axios";

export const LoginForm = (props) => {
  let navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const { setShowModal } = useModal();
  const { pathname } = useLocation();
  const { showAlert, setShowAlert } = useAlert();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const loginInputHandler = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    setError("");
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setError(null);
        authDispatch({ type: "LOGIN", payload: response.data });

        //Save user info in local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        //reset on submission
        setLoginDetails({
          email: "",
          password: "",
        });
        if (pathname === "/products") {
          setShowModal(false);
        }
        setShowAlert({
          showAlert: true,
          alertMessage: "Logged in successfully!",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response.status === 404) {
        setError("No user found with this email. Please try again.");
      } else {
        setError("Unexpected error. Please try again in some time.");
      }
    }
  };

  const testLogin = () => {
    setLoginDetails({
      ...loginDetails,
      email: "adarshbalika@gmail.com",
      password: "adarshBalika123",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (authState.isAuthenticated) {
        if (pathname === "/login") {
          navigate("/");
          setShowAlert({
            setShowAlert: false,
            alertMessage: null,
            type: null,
          });
        }
        setShowModal(false);
      }
    }, 2000);
  }, [showAlert.showAlert]);

  const loginClasses = "login__container " + props.classes;

  return (
    <main className={loginClasses}>
      {showAlert.showAlert && <Alert />}
      <form
        className="input-form"
        autoComplete="on"
        onSubmit={formSubmitHandler}
      >
        <h3>Login</h3>
        <label htmlFor="email">
          Email
          <span className="red">*</span>
        </label>
        <input
          type="text"
          name="email"
          className={error ? "input-error" : ""}
          value={loginDetails.email}
          placeholder="abc@gmail.com"
          required
          onChange={loginInputHandler}
        />

        <label className="label" htmlFor="password">
          Password
          <span className="red">*</span>
        </label>
        <div className="">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={"password-input" + (error ? " input-error" : "")}
            value={loginDetails.password}
            placeholder="*********"
            required
            onChange={loginInputHandler}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </span>
        </div>

        <div className="login__CTA">
          <button className="btn btn-primary">Login</button>
          <Link className="btn-link-text align-center" to="/signup">
            Create new account
          </Link>
          <button className="btn btn-outline" onClick={testLogin}>
            Test Credentials
          </button>
        </div>
        {error && <span className="red error-message">{error}</span>}
      </form>
    </main>
  );
};
