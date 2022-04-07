import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, usePlaylistModal, useAlert } from "../../../CustomHooks/";
import axios from "axios";

const Signupform = () => {
  const intialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrorState = {
    error: false,
    message: "",
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const [signupDetails, setSignupDetails] = useState(intialState);
  const { showAlert, setShowAlert } = useAlert();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState(initialErrorState);
  // const { setShowModal } = usePlaylistModal();
  const signupInputChangeHandler = (event) => {
    setSignupDetails({
      ...signupDetails,
      [event.target.name]: event.target.value,
    });
  };

  const showPasswordHandler = (key) => {
    setShowPassword({
      ...showPassword,
      [key]: !showPassword[key],
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupDetails;
    setError(initialErrorState);

    if (password.length < 6) {
      setError({
        error: true,
        message: "Password must be at least 6 characters long",
        passwordError: true,
      });
      setSignupDetails({ ...signupDetails, password: "", confirmPassword: "" });
      return;
    }

    if (password.search(/\d/) === -1) {
      setError({
        error: true,
        message: "Password must contain at least one number",
        passwordError: true,
      });
      setSignupDetails({ ...signupDetails, password: "", confirmPassword: "" });
      return;
    }

    if (password.search(/[a-z]/) === -1) {
      setError({
        error: true,
        message: "Password must contain at least one lowercase letter",
        passwordError: true,
      });
      setSignupDetails({ ...signupDetails, password: "", confirmPassword: "" });
      return;
    }

    if (password.search(/[A-Z]/) === -1) {
      setError({
        error: true,
        passwordError: true,
        message: "Password must contain at least one Uppercase letter",
      });
      setSignupDetails({ ...signupDetails, password: "", confirmPassword: "" });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        error: true,
        message: "Passwords do not match",
        confirmPasswordError: true,
        passwordError: true,
      });
      setSignupDetails({ ...signupDetails, password: "", confirmPassword: "" });
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.status === 201) {
        setSignupDetails(intialState);
        authDispatch({ type: "SIGNUP", payload: response.data });
        setShowAlert({
          showAlert: true,
          alertMessage: "Account created successfully!",
          type: "success",
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        if (pathname === "/signup") {
          navigate(-2);
        }
        // setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setError({ error: true, message: "Account already exists" });
        setSignupDetails(intialState);
      } else {
        setError({ error: true, message: "Unexpected error" });
      }
    }
  };
  return (
    <main className="signup__container">
      <form className="input-form" autoComplete="on" onSubmit={submitHandler}>
        <h3>Signup</h3>
        <label className="label" htmlFor="first-name">
          First Name<span className="red">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          placeholder="John"
          required
          value={signupDetails.firstName}
          onChange={signupInputChangeHandler}
        />
        <label className="label" htmlFor="last-name">
          Last Name<span className="red">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          placeholder="Doe"
          required
          value={signupDetails.lastName}
          onChange={signupInputChangeHandler}
        />

        <label className="label" htmlFor="email">
          Email Id<span className="red">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="abc@gmail.com"
          required
          value={signupDetails.email}
          onChange={signupInputChangeHandler}
        />

        <label className="label" htmlFor="password">
          Password <span className="red">*</span>
        </label>
        <div>
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            className={
              "password-input" + (error.passwordError ? " input-error" : "")
            }
            placeholder="*********"
            required
            value={signupDetails.password}
            onChange={signupInputChangeHandler}
          />
          <span
            onClick={() => {
              showPasswordHandler("password");
            }}
          >
            {!showPassword.password ? (
              <i className="fa-solid fa-eye" aria-hidden="true"></i>
            ) : (
              <i className="fa-solid fa-eye-slash" aria-hidden="true"></i>
            )}
          </span>
        </div>

        <label className="label" htmlFor="confirm-password">
          Confirm Password <span className="red">*</span>
        </label>
        <div>
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            className={
              "password-input" + (error.passwordError ? " input-error" : "")
            }
            placeholder="*********"
            required
            value={signupDetails.confirmPassword}
            onChange={signupInputChangeHandler}
          />
          <span
            onClick={() => {
              showPasswordHandler("confirmPassword");
            }}
          >
            {!showPassword.confirmPassword ? (
              <i className="fa-solid fa-eye" aria-hidden="true"></i>
            ) : (
              <i className="fa-solid fa-eye-slash" aria-hidden="true"></i>
            )}
          </span>
        </div>

        <div className="login__CTA">
          <button className="btn btn-primary">Signup</button>
          <Link className="btn-link-text align-center" to="/login">
            Existing user? Login.
          </Link>
        </div>
        {error.error && <p className="red error-message">{error.message}</p>}
      </form>
    </main>
  );
};

export default Signupform;
