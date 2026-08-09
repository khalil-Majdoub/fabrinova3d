import QuoteRequest from "../models/QuoteRequest.js";
import { sendMail } from "../utils/mailer.js";

export const submitQuote = async (req, res, next) => {
  try {
    const { nom, prenom, societe, email, telephone, typeService, description, quantite, matiere, couleur, delai } = req.body;

    const files = (req.files || []).map((f) => ({
      originalName: f.originalname,
      storedName: f.filename,
      url: `/uploads/${f.filename}`,
      mimeType: f.mimetype,
      size: f.size,
    }));

    const quote = await QuoteRequest.create({
      client: { nom, prenom, societe, email, telephone },
      project: { typeService, description, quantite, matiere, couleur, delai },
      files,
    });

    sendMail({
      subject: `Nouvelle demande de devis - ${nom} ${prenom}`,
      text: `Nouvelle demande de devis reçue de ${email}. Voir l'admin pour les détails.`,
    });

    res.status(201).json(quote);
  } catch (err) {
    next(err);
  }
};

export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    next(err);
  }
};

export const getQuote = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Not found" });
    res.json(quote);
  } catch (err) {
    next(err);
  }
};

export const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quote) return res.status(404).json({ message: "Not found" });
    res.json(quote);
  } catch (err) {
    next(err);
  }
};
