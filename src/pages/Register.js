import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [confirm, setConfirm] = useState ("");

    const handleRegister = async () => {
       if (!name || !email || !password || !lastname || !phone|| !location || !confirm) {
        alert("Please fill all fields");
        return;
       }

       if (password !== confirm) {
        alert("Passwords do not match");
        return;
       }

       try {
       const response = await fetch("https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify( {username:name, email, password, lastname, phone, location, role: "user"})
        });
  
       if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }

       alert("Registration successful!");
       navigate("/login");

       } catch (error) {
       console.error("Registration error:", error);
       alert("Registration failed");
       }
     };

   
  return (
    <div className="register-page">
      <div className="register-bg-circle"></div>
        <div className="register-card">
          <img src="/logo1.png" className="login-logo" alt="CM Logo" />
           <h2 className="register-title">Register</h2>


           <label className="register-label">Name</label>
           <input
           className="register-input"
           type="text"
           placeholder="Name"
           value={name}
           onChange={e => setName(e.target.value)}
           />


           <label className="register-label">Email</label>
           <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
           />

           <label className="register-label">Password</label>
           <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
           />

           <label className="register-label">Lastname</label>
           <input
            className="register-input"
            type="text"
            placeholder="lastname"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
           />

           <label className="register-label">Phone</label>
           <input
            className="register-input"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            />

           <label className="register-label">Location</label>
           <input
            className="register-input"
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            />

           <label className="register-label">Confirm Password</label>
           <input
           className="register-input"
           type="password"
           placeholder="Confirm password"
           value={confirm}
           onChange={e => setConfirm(e.target.value)}
          />

           <button className = "register-button" onClick={handleRegister}>Register</button>

             <p className="register-text">Already have an account?
               <span className="register-link"
               onClick={() => navigate ("/login")}> Login </span>
             </p>
        </div>
       </div>
      );
     };


 
export default Register;
