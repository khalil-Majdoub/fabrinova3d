import { Routes, Route, useLocation } from "react-router-dom";
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
import Signup from "./pages/admin/Signup.jsx";
import CustomerSignup from "./pages/CustomerSignup.jsx";
import Account from "./pages/Account.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductsAdmin from "./pages/admin/ProductsAdmin.jsx";
import ServicesAdmin from "./pages/admin/ServicesAdmin.jsx";
import RealisationsAdmin from "./pages/admin/RealisationsAdmin.jsx";
import BlogAdmin from "./pages/admin/BlogAdmin.jsx";
import QuotesAdmin from "./pages/admin/QuotesAdmin.jsx";
import MessagesAdmin from "./pages/admin/MessagesAdmin.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { pathname } = useLocation();
  const isStandalone = pathname.startsWith("/admin") || ["/login", "/signup"].includes(pathname);
  return (
    <div className="site-shell">
      {!isStandalone && <Navbar />}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/produits/:id" element={<ProductDetails />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/devis" element={<Devis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

        
        <Route path="/admin/login" element={<Login adminOnly />} />
        <Route path="/admin/setup" element={<Signup />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><ProductsAdmin /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><ServicesAdmin /></ProtectedRoute>} />
        <Route path="/admin/realisations" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><RealisationsAdmin /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><BlogAdmin /></ProtectedRoute>} />
        <Route path="/admin/quotes" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><QuotesAdmin /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><MessagesAdmin /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isStandalone && <Footer />}
    </div>
  );
}

export default App;
