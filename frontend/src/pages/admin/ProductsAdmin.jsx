import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell.jsx";
import api from "../../api/axios.js";
const ProductsAdmin=()=>{const [items,setItems]=useState([]);useEffect(()=>{api.get("/products").then(({data})=>setItems(data)).catch(()=>{});},[]);return <AdminShell title="Products" subtitle="Manage the public product catalog" action={<button className="button">Add product</button>}><div className="table-wrap"><table className="table"><thead><tr><th>Product</th><th>Category</th><th>Material</th><th>Price</th></tr></thead><tbody>{items.length?items.map(p=><tr key={p._id}><td>{p.name}</td><td>{p.category || "—"}</td><td>{p.material || "—"}</td><td>{p.price ? `${p.price} TND` : "Quote"}</td></tr>):<tr><td colSpan="4" className="admin-empty">No products yet. Add your first product to populate the catalog.</td></tr>}</tbody></table></div></AdminShell>};
export default ProductsAdmin;
