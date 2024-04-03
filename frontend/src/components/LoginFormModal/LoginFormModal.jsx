import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demoLogin = async () => {
    setCredential("demo@user.io");
    setPassword("password");
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const login = await dispatch(
      sessionActions.login({ credential, password })
    );
    if (login && login.errors) {
      return setErrors(login.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal">
      <h1 className="login-header">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username or Email
          <input
            className="login-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        <button className="login-button" type="submit">
          Log In
        </button>
        <button
          className="login-button-demo"
          type="submit"
          onClick={() => demoLogin()}
        >
          Demo Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
