import { Link } from "react-router-dom";

const Restricted = () => {
  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm p-5 bg-white text-center">

        <h2 className="fw-bold mb-3">Access Restricted</h2>
        <p className="text-muted mb-4">You don't have permission to access this page.</p>

        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
       </div>
     </div>
    );
};

export default Restricted;