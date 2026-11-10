import {useParams,useNavigate,useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "../styles/client_details.css";

const EditClient = ({clients, setClients}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const routeLocation = useLocation();
  const returnTo = routeLocation.state?.from || "/clients";

  const [client, setClient] = useState(null);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const [location, setLocation] = useState("")


   // Load client
  useEffect(() => {
    const found = clients.find(
  (c) => c.id === id);

   if (found) {
      setClient(found);

      setName(found.name ||"");
      setEmail(found.email ||"");
      setLastname(found.lastname ||"");
      setPhone(found.phone ||"");
      setLocation(found.location ||"");
      setStatus(found.status ||"Active");

    }
    
   else {
      fetch(`https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients/${id}`)
      
      .then(res => {
       if (!res.ok) {
       throw new Error(`HTTP error: ${res.status}`);
       }
       
       return res.json();
      })

      .then(data =>{
        setClient(data);
        setName(data.name ||"");
        setEmail(data.email ||"");
        setLastname(data.lastname ||"");
        setPhone(data.phone||"");
        setLocation(data.location||"");
        setStatus(data.status||"Active");
        })

      .catch(err => console.error("Error loading client:", err));
    } 
  } , [clients, id]);

     // Loading
     if(!client)return <div className="container-fluid py-4">Loading client...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();

      // Save
     if(!name.trim() || !email.trim() || !location.trim() || !phone.trim() || !lastname.trim() || !status.trim()) {
            alert("Please fill  all fields.")
            return;
        }


    const updatedClient = {...client, name,  email, lastname, phone, location, status,  updatedAt: new Date().toISOString()};

    fetch(`https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients/${id}` , {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(updatedClient)
    })

      .then(res => {
       if (!res.ok) {
       throw new Error(`HTTP error: ${res.status}`);
       }
       
       return res.json();
      })

      .then(updated => {
       setClients(prev =>
       prev.map(client =>
        client.id === updated.id ? updated : client
        )
       );

       navigate(returnTo);
      })

      .catch(error => {
      console.error("Error updating client:", error);
      alert("Something went wrong while updating the client.");
      });

    };


    const handleDelete = async () => {
    if (!window.confirm("Είσαι σίγουρη ότι θέλεις να διαγράψεις αυτόν τον πελάτη;")) return;

    try {
        const response = await fetch(`https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
      }
      setClients(prev => prev.filter(c => c.id !== id));
      navigate(returnTo);

    } catch (error) {
       console.error("Error deleting client:", error);
       alert("Something went wrong while deleting the client.");
    }
  };

  return (
    <div className="container-fluid py-4">

      <form className="card shadow-sm p-5 bg-white client-details-card" onSubmit={handleSubmit}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4" >
          <h2> Edit Client </h2>

          <div>
            <button type="submit" className="btn btn-primary me-2">
              Save
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
 
        {/* Avatar + name + email */}
        <div className="d-flex align-items-center mb-5">
          
          <div className="client-initials-avatar me-3">
            {name.charAt(0).toUpperCase()}
            {lastname.charAt(0).toUpperCase()}
          </div>

          <div>
           <h5 className="fw-bold mb-1">
           {name} {lastname}
           </h5>
           <p className="text-muted mb-0">{email}</p>
          </div>

        </div>



        {/* Form fields */}
        <div className="edit-form-grid">

          <div className="edit-field">
            <label className="edit-label"> Name </label>
          <input
          className="edit-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="edit-field">
            <label className="edit-label">Phone</label>
            <input
              className="edit-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
 
          <div className="edit-field">
            <label className="edit-label">Last Name</label>
            <input
              className="edit-input"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
 
          <div className="edit-field">
            <label className="edit-label">Location</label>
            <input
              className="edit-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
 
          <div className="edit-field">
            <label className="edit-label">Email</label>
            <input
              className="edit-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
 
          <div className="edit-field">
            <label className="edit-label">Status</label>
            <select
              className="edit-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
 
      </form>
    </div>
  );
};
 
export default EditClient;



