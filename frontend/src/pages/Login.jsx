import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        Email: email,
        Password: password,
      });
      const { token, role } = response.data;
      localStorage.setItem("token", token);

      if (role === "participant") {
          navigate("/participant");
      } else if (role === "organisation") {
          navigate("/dashboard");
      } else if (role === "serviceprovider") {
          navigate("/service-provider");
      } else {
          alert("Unknown role");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p>New User? <Link to="/signup">Signup</Link></p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
