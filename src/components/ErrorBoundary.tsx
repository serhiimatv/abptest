import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <div className="error">
      <Link to="/">Return to main page</Link>
    </div>
  );
};

export default ErrorBoundary;
