import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/Authcontext.jsx";
import "./auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password
    });

    login(
      {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email
      },
      res.data.token
    );

    navigate("/menu");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;