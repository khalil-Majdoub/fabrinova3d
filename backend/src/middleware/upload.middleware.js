import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const ALLOWED_EXTENSIONS = [".stl", ".step", ".stp", ".obj", ".3mf", ".pdf", ".zip"];
const MAX_FILE_SIZE_MB = 50;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error(`File type ${ext} not allowed`));
  }
  cb(null, true);
};

export const uploadQuoteFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
}).array("files", 10); 
