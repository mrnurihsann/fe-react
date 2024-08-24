// Import hook react
import React, { useState, useContext } from "react";

// Import hook useNavigate from react router dom
import { useNavigate } from "react-router-dom";

// Import services api
import api from "../../services/api";

// Import js-cookie
import Cookies from "js-cookie";

// Import context
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  // Navigate
  const navigate = useNavigate();

  // Destructure context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext);

  // Define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);
  const [loginFailed, setLoginFailed] = useState([]);

  // Function "login"
  const login = async (e) => {
    e.preventDefault();

    // Call API login
    await api
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Set token and user to cookie
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", JSON.stringify(response.data.data.user));

        // Assign true to state "isAuthenticated"
        setIsAuthenticated(true);

        // Redirect to dashboard page
        navigate("/admin/dashboard", { replace: true });
      })
      .catch((error) => {
        // Assign error to state "validation"
        setValidation(error.response.data);

        // Assign error to state "loginFailed"
        setLoginFailed(error.response.data);
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card border-0 rounded shadow-sm">
          <div className="card-body">
            <h4 className="text-center">LOGIN</h4>
            <hr />
            {validation.errors && (
              <div className="alert alert-danger mt-2 pb-0">
                {validation.errors.map((error, index) => (
                  <p key={index}>
                    {error.path} : {error.msg}
                  </p>
                ))}
              </div>
            )}
            {loginFailed.message && (
              <div className="alert alert-danger mt-2">
                {loginFailed.message}
              </div>
            )}
            <form onSubmit={login}>
              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 mb-3">
                LOGIN
              </button>
            </form>

            <div className="text-center mb-3">
              <span>Or login with</span>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-dark w-100 me-2">
                <i className="bi bi-google me-2"></i> Google
              </button>
              <button className="btn btn-outline-dark w-100 me-2">
                <i className="bi bi-facebook me-2"></i> Facebook
              </button>
              <button className="btn btn-outline-dark w-100">
                <i className="bi bi-github me-2"></i> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
