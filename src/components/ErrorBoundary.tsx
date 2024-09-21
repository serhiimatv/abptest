import { Link } from "react-router-dom";
import styles from "@/app.module.css";

const ErrorBoundary = () => {
  return (
    <div className={styles.error}>
      <h1>Error</h1>
      <p>An error occurred. Please return to the main page.</p>
      <Link to="/">Go to Main Page</Link>
    </div>
  );
};

export default ErrorBoundary;
