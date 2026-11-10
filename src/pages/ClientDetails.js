import { useParams,useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/client_details.css";

const ClientDetails = ({clients}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.from || "/clients";

    const role = localStorage.getItem("role");
    const [client, setClient]= useState(null);
     

     // load client
    useEffect(() => {
      const found = clients.find(
      (c) => c.id === id
      );


      if (found) {
        setClient(found)
      }
      else {
        fetch(`https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients/${id}`)

        .then(res => {
          if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
          }

          return res.json();
        })

        .then(data => setClient(data))
        .catch(err => console.error("Error loading client:", err));
      }
    }, [clients, id]);
    

      if(!client) return <div className="container-fluid py-4">Loading client...</div>;

    return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm p-5 bg-white client-details-card">

         {/*header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0"> Client Details </h2>

        {/* Only admin can edit */}
        {role === "admin" && (
        <button className="btn btn-primary"

         onClick={() => navigate(`/edit-client/${client.id}`,{
           state: { from: returnTo }
         })
         }
         >

          Edit Client </button>
          )}
        </div>
 
        {/* Avatar + name + status */}
        <div className="d-flex align-items-center mb-5">
         <img src="/client-profile.svg" alt={client.name} className="client-avatar me-3"/>
          <div>
            <h5 className="fw-bold mb-1">{client.name}</h5>
              <p className="text-muted mb-2">{client.email}</p>
                <span className="badge bg-primary status-badge">{client.status ||"Active"}</span>
          </div>
        </div>
 
        {/* Personal Info */}
        <div className="client-section mb-5">
          <h6 className="client-section-title">Personal Info</h6>
           <div className="row">
            <div className="col-md-3">
             <p className="client-field-label">Name</p>
             <p className="client-field-value">{client.name || "—"}</p>
            </div>
           
            <div className="col-md-3">
            <p className="client-field-label">Last Name</p>
            <p className="client-field-value">{client.lastname || "—"}</p>
            </div>

            <div className="col-md-3">
            <p className="client-field-label">Phone</p>
            <p className="client-field-value">{client.phone || "—"}</p>
            </div>
             
            <div className="col-md-3">
            <p className="client-field-label">Location</p>
            <p className="client-field-value"> {client.location || "—"}</p>
            </div>
          </div>
         </div>
 
          {/* Activity */}
            <div className="client-section">
             <h6 className="client-section-title">Activity</h6>
             <div className="row">

                <div className="col-md-3">
                <p className="client-field-label">Created at</p>
                <p className="client-field-value">
                  
                  {client.createdAt
                  ? new Date(client.createdAt).toLocaleDateString("el-GR")
                  : "—"}</p>
                
                </div>
              
                <div className="col-md-3">
                <p className="client-field-label">Updated at</p>
                <p className="client-field-value">
                  
                  {client.updatedAt
                  ? new Date(client.updatedAt).toLocaleDateString("el-GR")
                  : "—"}</p>

                </div>
             </div>
        </div>
     </div>
    </div>
  );
};
 
export default ClientDetails;
 