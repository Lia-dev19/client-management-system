import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async () => {

        if (!email || !password){
            alert ("Please fill in both fields");
            return;
        }

        try{
        const res = await fetch ("https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/users");
        if (!res.ok) {
         throw new Error(`HTTP error: ${res.status}`);
        }


        const users = await res.json();
        
        const user = users.find(
            u => u.email === email && u.password === password
        );
    
        if(!user) {
            alert("wrong email or password");
            return;
        }
        
        localStorage.setItem("token", "abc123");
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.username);

       
        navigate ("/dashboard");
       
   
   
       } catch (error) {
        console.error("Error logging in:", error);
        alert("Something went wrong. Please try again.");
        }
    };

    return (
      <div className="login-page">
        <div className="login-bg-circle"></div>
        <div className="login-card">
           <img src="/logo1.png" className="login-logo" alt="CM Logo" />
           <h2 className="login-title">Login</h2>

           <label className="login-label">Email</label>
           <input
            type="email"
            placeholder="Email"
            name= "email"
            value= {email}
            onChange = {e => setEmail(e.target.value)}
            className = "login-input"
           />
           

           <label className="login-label">Password</label>
           <div className="password-wrapper">
             <input
             type={showPassword ? "text" : "password"}
             placeholder= "Password"
             name= "password"
             value={password}
             onChange={ e => setPassword(e.target.value)}
             className="login-input"
             />

             {password.length > 0 && (
             <img
              src= {showPassword ? "/Icon-off.svg" : "/Icon.svg"}
              className="eye-icon"
              alt="Show password"
              onClick={() => setShowPassword(!showPassword)}
             />
             )}
            </div>
           
           <button className="login-button" onClick={handleLogin}>Login</button>

           <p className="login-text">Do you have an account?
             <span className="login-link"
             onClick={() => navigate ("/register")}> Sign up </span>
           </p>

        </div>
      </div>
        
    );
};


export default Login;
