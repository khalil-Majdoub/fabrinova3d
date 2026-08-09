import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import Realisations from "./pages/Realisations.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Devis from "./pages/Devis.jsx";

import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductsAdmin from "./pages/admin/ProductsAdmin.jsx";
import ServicesAdmin from "./pages/admin/ServicesAdmin.jsx";
import RealisationsAdmin from "./pages/admin/RealisationsAdmin.jsx";
import BlogAdmin from "./pages/admin/BlogAdmin.jsx";
import QuotesAdmin from "./pages/admin/QuotesAdmin.jsx";
import MessagesAdmin from "./pages/admin/MessagesAdmin.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/devis" element={<Devis />} />

        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductsAdmin /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
        <Route path="/admin/realisations" element={<ProtectedRoute><RealisationsAdmin /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><BlogAdmin /></ProtectedRoute>} />
        <Route path="/admin/quotes" element={<ProtectedRoute><QuotesAdmin /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><MessagesAdmin /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
