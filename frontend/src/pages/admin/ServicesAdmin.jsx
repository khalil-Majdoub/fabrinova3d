import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell.jsx";
import api from "../../api/axios.js";
const ServicesAdmin=()=>{const [items,setItems]=useState([]);useEffect(()=>{api.get("/services").then(({data})=>setItems(data)).catch(()=>{});},[]);return <AdminShell title="Services" subtitle="Define the workshop capabilities displayed on the site" action={<button className="button">Add service</button>}><div className="table-wrap"><table className="table"><thead><tr><th>Service</th><th>Category</th><th>Status</th></tr></thead><tbody>{items.length?items.map(x=><tr key={x._id}><td>{x.title}</td><td>{x.category}</td><td><span className="status">{x.status}</span></td></tr>):<tr><td colSpan="3" className="admin-empty">No services have been added yet.</td></tr>}</tbody></table></div></AdminShell>};
export default ServicesAdmin;
