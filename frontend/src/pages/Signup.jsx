import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Signup() {
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Username: "",
    Email: "",
    Password: "",
    DOB: "",
    Role: "organisation",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <p>Already Registered? <Link to="/login">Login</Link></p>
        <form onSubmit={handleSignup}>
          <label>First Name</label>
          <input type="text" name="First_Name" placeholder="First Name" onChange={handleChange} required />

          <label>Last Name</label>
          <input type="text" name="Last_Name" placeholder="Last Name" onChange={handleChange} required />

          <label>Username</label>
          <input type="text" name="Username" placeholder="Username" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="DOB" onChange={handleChange} required />

          <label>Role</label>
          <select name="Role" onChange={handleChange} required>
            <option value="organisation">Organisation</option>
            <option value="participant">Participant</option>
            <option value="serviceprovider">Service Provider</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
