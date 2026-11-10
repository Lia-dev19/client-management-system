import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/clients.css";

const Clients = ({clients}) => {
    const role = localStorage.getItem("role");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const perPage = 14;
    
    //Search clients
    const filteredClients = clients.filter((client) => {
    const searchText = search.toLowerCase();

    return (
      client.name?.toLowerCase().includes(searchText) ||
      client.lastname?.toLowerCase().includes(searchText) ||
      client.email?.toLowerCase().includes(searchText)
    );
  });

    // Last Update
     const getLastUpdate = (client) => {
     const date = client.updatedAt || client.createdAt;

     if (!date) return "—";

     return new Date(date).toLocaleDateString("el-GR");
    };

    //Pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageClients = filteredClients.slice(start, end);

    return (
        <div className="container-fluid py-4">
         <div className="card shadow-sm p-4 bg-white">
          <h2 className="fw-bold mb-3">Clients Page</h2>

          {/*search */}
          <div className="mb-4">
            <input
            type="text"
            className="form-control"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          </div>

          {/*header*/}
          <div className="recent-header">
          <span>Name</span>
          <span>Email</span>
          <span className="mobile-hide">Status</span>
          <span className="mobile-hide">Last update</span>
          <span>Actions</span>
         </div>
    
         {/*clients*/}
         <div className="recent-clients">
          {pageClients.map((client) => (
            <div key={client.id} className= "recent-item">
              <span>{client.name} {client.lastname || ""}</span>
              <span>{client.email}</span>
              <span className="badge bg-primary status-badge mobile-hide"> {client.status || "Active"} </span>
              <span className="mobile-hide">{getLastUpdate(client)}</span>
              <span className="actions">
               <Link to={`/client/${client.id}`} state={{ from: "/clients" }} >
               <img src="/client-details.svg" alt="Client Details" className="action-icon me-2" />
               </Link>

                 {/*Edit Admin only*/}
                {role === "admin" && (
                    <Link to = {`/edit-client/${client.id}` } state={{ from: "/clients" }} >
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
            disabled={end >= filteredClients.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
       </div>
      </div>
      
    );
};

export default Clients;

