// Import hook react
import React, { useState } from "react";

// Import hook useNavigate from react router dom
import { useNavigate } from "react-router-dom";

// Import services api
import api from "../../services/api";

export default function Register() {
  // Navigate
  const navigate = useNavigate();

  // Define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);

  // Function "register"
  const register = async (e) => {
    e.preventDefault();

    // Call API register
    await api
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        // Assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card border-0 rounded shadow-sm">
          <div className="card-body">
            <h4 className="text-center">REGISTER</h4>
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
            <form onSubmit={register}>
              <div className="mb-3">
                <div className="form-group">
                  <label className="mb-1 fw-bold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group">
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
              </div>

              <div className="mb-3">
                <div className="form-group">
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
              </div>

              <button type="submit" className="btn btn-dark w-100 mb-3">
                REGISTER
              </button>
            </form>

            <div className="text-center mb-3">
              <span>Or register with</span>
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
