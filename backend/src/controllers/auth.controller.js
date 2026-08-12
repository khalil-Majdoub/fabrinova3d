import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const ADMIN_ROLES = ["admin", "staff"];

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const normaliseEmail = (email) => String(email || "").trim().toLowerCase();

const readAccountInput = (body) => ({
  name: String(body.name || "").trim(),
  email: normaliseEmail(body.email),
  password: String(body.password || ""),
});

const validateAccountInput = ({ name, email, password }) => {
  if (name.length < 2) return "Please provide a name with at least 2 characters";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Please provide a valid email address";
  if (password.length < 8) return "Password must contain at least 8 characters";
  return null;
};

const sendSession = (res, status, user) => {
  const token = generateToken(user);
  res.status(status).json({ token, user: toPublicUser(user) });
};

const setupKeysMatch = (providedKey, expectedKey) => {
  const provided = Buffer.from(String(providedKey || ""));
  const expected = Buffer.from(expectedKey);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
};

export const signup = async (req, res, next) => {
  try {
    const account = readAccountInput(req.body);
    const validationError = validateAccountInput(account);
    if (validationError) return res.status(400).json({ message: validationError });

    const passwordHash = await bcrypt.hash(account.password, 12);
    // Never accept a role from the browser: every public sign-up is a customer.
    const user = await User.create({ name: account.name, email: account.email, passwordHash, role: "customer" });
    sendSession(res, 201, user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    next(err);
  }
};

export const setupAdmin = async (req, res, next) => {
  try {
    const setupKey = process.env.ADMIN_SETUP_KEY;
    if (!setupKey) {
      return res.status(503).json({ message: "Admin setup is not configured. Set ADMIN_SETUP_KEY in backend/.env first." });
    }
    if (!setupKeysMatch(req.body.setupKey, setupKey)) {
      return res.status(403).json({ message: "The administrator setup key is invalid" });
    }
    if (await User.exists({ role: "admin" })) {
      return res.status(403).json({ message: "An administrator account already exists. Use the admin login page." });
    }

    const account = readAccountInput(req.body);
    const validationError = validateAccountInput(account);
    if (validationError) return res.status(400).json({ message: validationError });

    const passwordHash = await bcrypt.hash(account.password, 12);
    const user = await User.create({ name: account.name, email: account.email, passwordHash, role: "admin" });
    sendSession(res, 201, user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    next(err);
  }
};

const authenticate = (adminOnly = false) => async (req, res, next) => {
  try {
    const email = normaliseEmail(req.body.email);
    const password = String(req.body.password || "");
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) return res.status(401).json({ message: "Invalid credentials" });
    if (adminOnly && !ADMIN_ROLES.includes(user.role)) {
      return res.status(403).json({ message: "This account does not have administrator access" });
    }

    sendSession(res, 200, user);
  } catch (err) {
    next(err);
  }
};

export const login = authenticate();
export const adminLogin = authenticate(true);

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
};
