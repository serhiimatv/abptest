import { Link } from "react-router-dom";
import styles from "@/app.module.css";

const ErrorBoundary = () => {
  return (
    <div className={styles.error}>
      <Link to="/">Happened some error, return to main page</Link>
    </div>
  );
};

export default ErrorBoundary;
