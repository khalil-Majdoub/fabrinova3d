import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const links = [["/", "Home"], ["/services", "Services"], ["/produits", "Products"], ["/realisations", "Portfolio"], ["/blog", "Blog"], ["/a-propos", "About"]];

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAdministrator = ["admin", "staff"].includes(user?.role);
  return <nav className="nav"><Link className="brand" to="/">FABRINOVA3D<i>.</i></Link><div className="nav-links">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}{user ? <Link to={isAdministrator ? "/admin/dashboard" : "/account"}>{isAdministrator ? "Dashboard" : "Account"}</Link> : <Link to="/login">Log in</Link>}</div>{user ? <button className="button ghost" onClick={logout}>Sign out</button> : <Link className="button" to="/devis">Request quote</Link>}</nav>;
};

export default Navbar;
