import { useEffect, useState } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";

import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";
import ClientDetails from "./pages/ClientDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import Restricted from "./pages/Restricted";


//Πώς φέρνουμε δεδομένα από το API
const App = () => {
  const [clients, setClients] = useState([]);

  useEffect (()=> {
     fetch("https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients")

     .then(res => { if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
       })

     .then(data => {
      setClients(data);
     })

     .catch(err => {
      console.error("Error loading clients:", err);
     });
    }, []) ;

  //το return με τα Routes
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
       <Route index element={<Navigate to = "/login" replace/>} />
       <Route path="login" element={<Login />} />
       <Route path="register" element={<Register />} />
       <Route path="dashboard" element={<ProtectedRoute> <Dashboard clients={clients} /> </ProtectedRoute>} />
       <Route path="clients" element={<ProtectedRoute> <Clients clients={clients} /> </ProtectedRoute>} />
       <Route path="add-client" element={<AdminRoute> <AddClient clients={clients} setClients={setClients} /> </AdminRoute>} />
       <Route path="profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
       <Route path="restricted" element={<Restricted />} />
       
       <Route path="edit-client/:id" element={<AdminRoute> <EditClient clients={clients} setClients={setClients} /> </AdminRoute>} />
       <Route path="client/:id" element={<ProtectedRoute><ClientDetails clients={clients} /> </ProtectedRoute>} />
       <Route path="*" element={<NotFound />} />
      </Route>
    
    </Routes>
  );
};

export default App;


