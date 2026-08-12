import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell.jsx";
import api from "../../api/axios.js";
const MessagesAdmin=()=>{const [items,setItems]=useState([]);useEffect(()=>{api.get("/contact").then(({data})=>setItems(data)).catch(()=>{});},[]);return <AdminShell title="Messages" subtitle="Messages received from the public contact form"><div className="table-wrap"><table className="table"><thead><tr><th>Sender</th><th>Subject</th><th>Message</th><th>Received</th></tr></thead><tbody>{items.length?items.map(x=><tr key={x._id}><td>{x.name}<br/><span className="muted">{x.email}</span></td><td>{x.subject || "General inquiry"}</td><td>{x.message?.slice(0,60)}…</td><td>{new Date(x.createdAt).toLocaleDateString()}</td></tr>):<tr><td colSpan="4" className="admin-empty">No messages received yet.</td></tr>}</tbody></table></div></AdminShell>};
export default MessagesAdmin;
