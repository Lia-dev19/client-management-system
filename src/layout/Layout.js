import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";


const Layout = () => {
    const location = useLocation();

    const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/register";
    
    return (
        <div className="layout d-flex">
            {!hideSidebar && <Sidebar/>}
            <main className="content flex-grow-1 bg-light p-4">
                <Outlet/>
            </main>
        </div>
    );
 };

export default Layout;
