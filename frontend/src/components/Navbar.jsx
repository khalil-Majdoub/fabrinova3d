import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/">Accueil</Link>
    <Link to="/a-propos">À propos</Link>
    <Link to="/services">Services</Link>
    <Link to="/produits">Boutique</Link>
    <Link to="/realisations">Réalisations</Link>
    <Link to="/blog">Blog</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/devis">Demander un devis</Link>
  </nav>
);

export default Navbar;
