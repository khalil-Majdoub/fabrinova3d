import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) return res.status(200).json({ message: "Already subscribed" });

    const subscriber = await NewsletterSubscriber.create({ email });
    res.status(201).json(subscriber);
  } catch (err) {
    next(err);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    next(err);
  }
};
