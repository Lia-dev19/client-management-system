import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";


const Sidebar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const username = localStorage.getItem("username") || "User";
    

    const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("role");
     localStorage.removeItem("userId");
     localStorage.removeItem("username");
     localStorage.removeItem("email");
     navigate("/login");
    };

    return (
      <div className="SidebarLayout">
        <div className="mobile-topbar">


          {/*Mobile menu button*/}
             <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu">
              <img
              src="/menu.svg"
              alt="menu"
              className="mobile-menu-icon"
              />
             </button>

           {/*Profile*/}
           <Link to="/profile" className="sidebar-profile text-decoration-none">
             <img src="/avatar.png" alt={username} className="sidebar-avatar" />
             <h5 className="sidebar-name">{username}</h5>
           </Link>

          {/* Mobile dark overlay */}
            {menuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
            </div>
            )}


          {/*Sidebar*/}
          <aside className={`Sidebar ${menuOpen ? "mobile-open" : ""} d-flex flex-column justify-content-between align-items-center p-4`}>

          {/* Mobile close button */}
           <button
           className="mobile-close-btn"
           onClick={() => setMenuOpen(false)}
           aria-label="Close menu"
           >  ×  </button>

           {/* logo*/}
           <Link to="/dashboard">
            <img src="/logo2.png" alt="CM Logo" className="sidebar-logo mb-4" />
            </Link>



           {/*Navigation*/}
          <nav className="nav flex-column w-100">
           <Link className="nav-link d-flex align-items-center mb-3" to="/clients"
           onClick={() => setMenuOpen(false)}>
           <img src="/clients.svg" alt="Clients" className="sidebar-icon me-2" />
           Clients
           </Link>

           <Link className="nav-link d-flex align-items-center mb-3" to="/dashboard"
           onClick={() => setMenuOpen(false)}>
           <img src="/dashboard.svg" alt="Dashboard" className="sidebar-icon me-2" />
           Dashboard
           </Link>

           <Link className="nav-link d-flex align-items-center mb-3" to="/profile"
           onClick={() => setMenuOpen(false)}>
           <img src="/profile.svg" alt="Profile" className="sidebar-icon me-2" />
           Profile
           </Link>
           
          </nav>

          <button className="btn btn-outline-light mt-auto w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
            <img src="/logout.svg" alt="Logout" className="sidebar-icon me-2" />
            Sign out
            </button>
          </aside>
        </div>
        </div>

        );
   };

export default Sidebar;
