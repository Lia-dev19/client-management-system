import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm p-5 bg-white text-center">
        
        <h2 className="fw-bold mb-3">404 - Page Not Found</h2>
        <p className="text-muted mb-4"> The page you're looking for doesn't exist.</p>

        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
       </div>
     </div>
    );
};

export default NotFound;