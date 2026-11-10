import "../styles/profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://6aa04a8e3e0d88d3d7e58a70.mockapi.io/api/users/${userId}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);
        
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Could not load profile.");
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setError("User not found.");
    }
  }, [userId]);

  if (error) {
    return (
      <div className="container py-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm p-5 bg-white client-details-card">

        <h2 className="fw-bold mb-4">My Profile</h2>

        {/* Profile header */}
        <div className="d-flex align-items-center mb-5">
          <img
           src="/avatar.png"
           alt="Profile"
           className="client-avatar me-3"
          />
          
          <div>
           <h5 className="fw-bold mb-0">{user.username || "—"}</h5>
           <p className="mb-2"> {user.email || "—"} </p>
            <span className="badge bg-success">
              {role === "admin" ? "Admin" : "User"}
            </span>
         </div>
        </div>

        {/* Profile fields */}
        <div className="edit-form-grid">

          <div className="edit-field">
          <label className="edit-label">Name</label>
            <input
              className="edit-input"
              type="text"
              value={user.username || ""}
              readOnly
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">Phone</label>
            <input
              className="edit-input"
              type="text"
              value={user.phone || "—"}
              readOnly
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">Lastname</label>
            <input
              className="edit-input"
              type="text"
              value={user.lastname || "—"}
              readOnly
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">Location</label>
            <input
              className="edit-input"
              type="text"
              value={user.location || "—"}
              readOnly
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">Email</label>
            <input
              className="edit-input"
              type="email"
              value={user.email || ""}
              readOnly
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">Role</label>
            <input
              className="edit-input"
              type="text"
              value={role === "admin" ? "Admin" : "User"}
              readOnly
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;