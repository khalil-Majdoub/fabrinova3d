import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = ({ adminOnly = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { login, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const user = await (adminOnly ? loginAdmin(email, password) : login(email, password));
      navigate(adminOnly || ["admin", "staff"].includes(user.role) ? "/admin/dashboard" : "/account");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const eyebrow = adminOnly ? "Restricted access" : "Account access";
  const heading = adminOnly ? <>ADMIN<br />LOGIN.</> : <>WELCOME<br />BACK.</>;
  const description = adminOnly ? "Sign in to manage manufacturing operations." : "Sign in to your Fabrinova3D account.";

  return <main className="login-page"><form className="login-box" onSubmit={submit}><Link className="brand" to="/">FABRINOVA3D<i>.</i></Link><div className="eyebrow" style={{ marginTop: 35 }}>{eyebrow}</div><h1>{heading}</h1><p className="muted">{description}</p><label><span className="field-label">Email address</span><input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label><span className="field-label">Password</span><input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button className="button" style={{ width: "100%", marginTop: 24 }} disabled={sending}>{sending ? "Signing in..." : adminOnly ? "Enter terminal →" : "Sign in →"}</button>{error && <p className="feedback error">{error}</p>}<p className="muted" style={{ marginTop: 22, fontSize: 13 }}>{adminOnly ? <>Need to create the first admin? <Link style={{ color: "var(--accent)" }} to="/admin/setup">Open administrator setup.</Link></> : <>New to Fabrinova3D? <Link style={{ color: "var(--accent)" }} to="/signup">Create an account.</Link> <br />Need the admin area? <Link style={{ color: "var(--accent)" }} to="/admin/login">Admin login.</Link></>}</p></form></main>;
};

export default Login;
