import { Link } from "react-router-dom";

const Footer = () => <footer className="footer"><div className="footer-inner"><div><Link className="brand" to="/">FABRINOVA3D<i>.</i></Link><p>From idea to manufactured solution.</p></div><div><p className="mono">TUNISIA / ADDITIVE MANUFACTURING</p><p>© {new Date().getFullYear()} Fabrinova 3D. All rights reserved.</p></div></div></footer>;

export default Footer;
