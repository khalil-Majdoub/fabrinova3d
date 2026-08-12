import ContactMessage from "../models/ContactMessage.js";
import { sendMail } from "../utils/mailer.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await ContactMessage.create({ name, email, subject, message });

    sendMail({
      subject: `Nouveau message de contact - ${name}`,
      text: message,
    });

    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
