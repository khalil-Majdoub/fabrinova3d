import { Link } from "react-router-dom";
const NotFound = () => <main className="not-found"><div><strong>404</strong><h1>THIS LAYER DOES NOT EXIST.</h1><p className="muted">The page you requested could not be found.</p><Link className="button" to="/">Return home →</Link></div></main>;
export default NotFound;
