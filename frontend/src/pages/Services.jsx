import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

const entries = [["FDM Printing", "Strong, functional, cost-effective parts for prototypes, tools, fixtures, and production batches.", "Active"], ["Resin Printing", "Highly detailed components with a smooth finish for models, jewellery, dental, and visual prototypes.", "Active"], ["Rapid Prototyping", "Iterate quickly with design feedback, material guidance, and manufacturing-ready solutions.", "Active"], ["Electronics Design", "Embedded systems and custom PCB design for connected products.", "Coming soon"], ["Laser Cutting", "Precise cutting and engraving on wood, acrylic, and more.", "Coming soon"], ["Custom Series", "Reliable repeat production for personalized objects and small technical series.", "Active"]];

const Services = () => <><PageHero eyebrow="Capabilities / 01—06" title="ENGINEERED TO MAKE." description="A focused suite of fabrication services, selected and adapted to your product, timeline, and performance requirements." /><main className="content"><div className="grid three">{entries.map(([title, text, status], i) => <article className="card service-card" key={title}><span className="service-number">0{i + 1} / {status}</span><div><h3>{title}</h3><p className="muted">{text}</p></div><Link className="mono" style={{ fontSize: 11, color: "var(--accent)" }} to="/devis">REQUEST A QUOTE →</Link></article>)}</div></main></>;

export default Services;
