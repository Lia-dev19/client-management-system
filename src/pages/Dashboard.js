import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/layout.css";


  //Pagination state
  const Dashboard = ({clients}) => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  
  const [page, setPage] = useState(1);
  const perPage = 7;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const recentClients = clients.slice(start, end);
  
  const activeClients = clients.filter(
    client => client.status === "Active"
  ).length;

  const pendingClients = clients.filter(
    client => client.status === "Pending"
  ).length;

  const inactiveClients = clients.filter(
    client => client.status === "Inactive"
  ).length;
   
  const getLastUpdate = (client) => {
  const date = client.updatedAt || client.createdAt;

  if (!date) return "—";

  return new Date(date).toLocaleDateString("el-GR");
};
  
    return (
    <div className="container-fluid py-4">

        {/*Καρτα overview*/}
        <div className="card shadow-sm p-4 mb-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">Dashboard overview</h4>
               <div className="dashboard-actions" >
                 <Link to="/clients" className="btn btn-outline-primary me-2">
                  View all Clients
                  </Link>

                  {role=== "admin" && (
                   <Link to="/add-client" className="btn btn-primary">
                    Add Client
                    </Link>
                    )}
                </div>
            </div>

            <p>Welcome back, {username}!<br/>Here's what's happening today.</p>

            {/*4 cards*/}
            <div className="row g-3 mt-3">
             <div className="col-md-3">
              <div className="card text-center p-3 bg-dark-purple text-white">
               <h6>Total Clients</h6>
               <h4>{clients.length}</h4>
              </div>
             </div>

             <div className="col-md-3">
              <div className="card text-center p-3 bg-purple text-white">
               <h6>Active Clients</h6>
               <h4>{activeClients}</h4>
              </div>
             </div>

             <div className="col-md-3">
              <div className="card text-center p-3 bg-blue text-white">
               <h6>Pending Clients</h6>
               <h4>{pendingClients}</h4>
              </div>
             </div>

             <div className="col-md-3">
              <div className="card text-center p-3 bg-secondary text-white">
               <h6>Inactive Clients</h6>
               <h4>{inactiveClients}</h4>
              </div>
             </div>
            </div>

         </div>


        {/*Recent clients */}
        <div className="card shadow-sm p-4 bg-white">
         <h5 className="fw-bold mb-3">Recent Clients</h5>
         <div className="recent-header">
          <span>Name</span>
          <span>Email</span>
          <span className="mobile-hide">Status</span>
          <span className="mobile-hide">Last update</span>
          <span>Actions</span>
         </div>
    

         <div className="recent-clients">
          {recentClients.map((client) => (
            <div key={client.id} className= "recent-item">
              <span>{client.name} {client.lastname || ""}</span>
              <span>{client.email}</span>
              <span className="badge bg-primary status-badge mobile-hide"> {client.status || "Active"} </span>
              <span className="mobile-hide" >{getLastUpdate(client)}</span>
              <span className="actions">
               <Link to={`/client/${client.id}`} state={{ from: "/dashboard" }} >
               <img src="/client-details.svg" alt="Client Details" className="action-icon me-2" />
               </Link>


               {role === "admin" && (
               <Link to={`/edit-client/${client.id}`} state={{ from: "/dashboard" }}>
               <img src="/edit-client.svg" alt="Edit Client" className="action-icon" />
               </Link>
               )}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={end >= clients.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard; 