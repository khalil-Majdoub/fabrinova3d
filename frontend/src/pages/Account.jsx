import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate("/"); };
  return <><section className="page-hero"><div className="eyebrow">Customer account</div><h1>HELLO,<br />{user?.name?.toUpperCase() || "MAKER"}.</h1><p>You are signed in as a customer. Your account does not have access to Fabrinova3D administration tools.</p></section><main className="content"><div className="grid two"><article className="card service-card"><span className="service-number">YOUR ACCOUNT</span><div><h3>{user?.email}</h3><p className="muted">Role: {user?.role || "customer"}</p></div><button className="button ghost" onClick={signOut}>Sign out</button></article><article className="card service-card"><span className="service-number">START A PROJECT</span><div><h3>Need something made?</h3><p className="muted">Send a project brief and files to receive a custom quote.</p></div><Link className="button" to="/devis">Request quote →</Link></article></div></main></>;
};

export default Account;
