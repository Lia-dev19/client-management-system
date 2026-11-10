import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/add_clients.css";


const AddClient = ({clients, setClients}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("Active");


    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!name.trim() || !email.trim() || !lastname.trim()|| !phone.trim() ||!location.trim() ) {
            alert("Please fill in all fields.")
            return;
        }


        const newClient = {
            name,
            email,
            lastname,
            phone,
            location,
            status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

    fetch("https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/clients", {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body : JSON.stringify(newClient)
     })

        .then(res =>  {
         if (!res.ok) {
         throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
        })

        .then(created =>{
            setClients([...clients, created]);
            navigate("/clients");
        })
   
        .catch(error => {
         console.error("Error adding client:", error);
         alert("Something went wrong while adding the client.");
        });

    }

    return (
        <div className="container-fluid py-4">
            
            <form className="card shadow-sm p-5 bg-white client-details-card" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between align-items-center mb-4">
               <h2 className="fw-bold mb-0">Add Client</h2>
               <button type="submit" className="btn btn-primary">
                Add Client
                </button>
                </div>

                {/* Form fields */}
                <div className="edit-form-grid">
                    <div className="edit-field">
                    <label className="edit-label">Name:</label>
                    <input
                    className="edit-input"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    </div>

                   <div className="edit-field">
                   <label className="edit-label">Email:</label>
                   <input
                   className="edit-input"
                   type="text"
                   placeholder="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   />
                   </div>

                   <div className="edit-field">
                   <label className="edit-label">Phone:</label>
                   <input
                   className="edit-input"
                   type="text"
                   placeholder="phone"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   />
                   </div>

                   <div className="edit-field">
                    <label className="edit-label">Lastname:</label>
                    <input
                    className="edit-input"
                    type="text"
                    placeholder="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    />
                    </div>

                   <div className="edit-field">
                   <label className="edit-label">Location:</label>
                   <input
                   className="edit-input"
                   type="text"
                   placeholder="location"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
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

export default AddClient;