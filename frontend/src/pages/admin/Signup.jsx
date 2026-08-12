import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", setupKey: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { setupAdmin } = useAuth();
  const navigate = useNavigate();
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("The passwords do not match.");
    setSending(true);
    try {
      await setupAdmin(form.name, form.email, form.password, form.setupKey);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create the administrator account.");
    } finally {
      setSending(false);
    }
  };
  return <main className="login-page"><form className="login-box" onSubmit={submit}><Link className="brand" to="/">FABRINOVA3D<i>.</i></Link><div className="eyebrow" style={{ marginTop: 35 }}>One-time setup</div><h1>CREATE<br />ADMIN.</h1><p className="muted">Create the first administrator with the private setup key from <span className="mono">backend/.env</span>. Customer sign-up never grants dashboard access.</p><label><span className="field-label">Your name</span><input className="field" name="name" value={form.name} onChange={update} required minLength="2" /></label><label><span className="field-label">Email address</span><input className="field" name="email" type="email" value={form.email} onChange={update} required /></label><label><span className="field-label">Password</span><input className="field" name="password" type="password" value={form.password} onChange={update} required minLength="8" /></label><label><span className="field-label">Confirm password</span><input className="field" name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} required minLength="8" /></label><label><span className="field-label">Administrator setup key</span><input className="field" name="setupKey" type="password" value={form.setupKey} onChange={update} required /></label><button className="button" style={{ width: "100%", marginTop: 24 }} disabled={sending}>{sending ? "Creating account..." : "Create administrator →"}</button>{error && <p className="feedback error">{error}</p>}<p className="muted" style={{ marginTop: 22, fontSize: 13 }}>Already set up? <Link style={{ color: "var(--accent)" }} to="/admin/login">Sign in.</Link></p></form></main>;
};

export default Signup;
