import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell.jsx";
import api from "../../api/axios.js";
const RealisationsAdmin=()=>{const [items,setItems]=useState([]);useEffect(()=>{api.get("/realisations").then(({data})=>setItems(data)).catch(()=>{});},[]);return <AdminShell title="Projects" subtitle="Publish completed work and case studies" action={<button className="button">Add project</button>}><div className="table-wrap"><table className="table"><thead><tr><th>Project</th><th>Technology</th><th>Material</th></tr></thead><tbody>{items.length?items.map(x=><tr key={x._id}><td>{x.title}</td><td>{x.technology || "—"}</td><td>{x.material || "—"}</td></tr>):<tr><td colSpan="3" className="admin-empty">No projects have been added yet.</td></tr>}</tbody></table></div></AdminShell>};
export default RealisationsAdmin;
