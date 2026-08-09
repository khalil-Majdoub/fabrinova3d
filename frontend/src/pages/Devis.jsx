import { useState } from "react";
import api from "../api/axios.js";

const initialState = {
  nom: "",
  prenom: "",
  societe: "",
  email: "",
  telephone: "",
  typeService: "",
  description: "",
  quantite: 1,
  matiere: "",
  couleur: "",
  delai: "",
};

const Devis = () => {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    files.forEach((file) => data.append("files", file));

    try {
      await api.post("/quotes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
      setForm(initialState);
      setFiles([]);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div>
      <h1>Demande de devis</h1>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input name="societe" placeholder="Société" value={form.societe} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />

        <input name="typeService" placeholder="Type de service" value={form.typeService} onChange={handleChange} required />
        <textarea name="description" placeholder="Description du projet" value={form.description} onChange={handleChange} required />
        <input name="quantite" type="number" min="1" value={form.quantite} onChange={handleChange} />
        <input name="matiere" placeholder="Matière souhaitée" value={form.matiere} onChange={handleChange} />
        <input name="couleur" placeholder="Couleur" value={form.couleur} onChange={handleChange} />
        <input name="delai" placeholder="Délai souhaité" value={form.delai} onChange={handleChange} />

        
        <input
          type="file"
          multiple
          accept=".stl,.step,.stp,.obj,.3mf,.pdf,.zip"
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi..." : "Envoyer la demande"}
        </button>

        {status === "success" && <p>Votre demande a bien été envoyée.</p>}
        {status === "error" && <p>Une erreur est survenue, veuillez réessayer.</p>}
      </form>
    </div>
  );
};

export default Devis;
