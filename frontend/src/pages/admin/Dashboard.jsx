import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Connecté en tant que {user?.name || "admin"}</p>
      <button onClick={logout}>Déconnexion</button>
      <ul>
        <li><Link to="/admin/products">Produits</Link></li>
        <li><Link to="/admin/services">Services</Link></li>
        <li><Link to="/admin/realisations">Réalisations</Link></li>
        <li><Link to="/admin/blog">Blog</Link></li>
        <li><Link to="/admin/quotes">Demandes de devis</Link></li>
        <li><Link to="/admin/messages">Messages de contact</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
