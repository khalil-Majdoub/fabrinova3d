import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell.jsx";
import api from "../../api/axios.js";
const BlogAdmin=()=>{const [items,setItems]=useState([]);useEffect(()=>{api.get("/blog").then(({data})=>setItems(data)).catch(()=>{});},[]);return <AdminShell title="Journal" subtitle="Manage articles and workshop updates" action={<button className="button">New article</button>}><div className="table-wrap"><table className="table"><thead><tr><th>Article</th><th>Category</th><th>Published</th></tr></thead><tbody>{items.length?items.map(x=><tr key={x._id}><td>{x.title}</td><td>{x.category || "—"}</td><td>{x.publishedAt ? new Date(x.publishedAt).toLocaleDateString() : "Draft"}</td></tr>):<tr><td colSpan="3" className="admin-empty">No journal posts have been published yet.</td></tr>}</tbody></table></div></AdminShell>};
export default BlogAdmin;
