import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const CustomerSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("The passwords do not match.");
    setSending(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create your account. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return <main className="login-page"><form className="login-box" onSubmit={submit}><Link className="brand" to="/">FABRINOVA3D<i>.</i></Link><div className="eyebrow" style={{ marginTop: 35 }}>Customer account</div><h1>MAKE AN<br />ACCOUNT.</h1><p className="muted">Create an account to keep your Fabrinova3D experience in one place. Customer accounts cannot access the administration area.</p><label><span className="field-label">Your name</span><input className="field" name="name" value={form.name} onChange={update} required minLength="2" /></label><label><span className="field-label">Email address</span><input className="field" name="email" type="email" value={form.email} onChange={update} required /></label><label><span className="field-label">Password</span><input className="field" name="password" type="password" value={form.password} onChange={update} required minLength="8" /></label><label><span className="field-label">Confirm password</span><input className="field" name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} required minLength="8" /></label><button className="button" style={{ width: "100%", marginTop: 24 }} disabled={sending}>{sending ? "Creating account..." : "Create account →"}</button>{error && <p className="feedback error">{error}</p>}<p className="muted" style={{ marginTop: 22, fontSize: 13 }}>Already have an account? <Link style={{ color: "var(--accent)" }} to="/login">Sign in.</Link></p></form></main>;
};

export default CustomerSignup;
