import { Router, type Request, type Response, type NextFunction } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { randomBytes } from "crypto";
import multer from "multer";

const router = Router();

// ── Auth middleware ────────────────────────────────────────────────────────
// Protects all mutating (POST) portfolio routes with a shared admin secret.
// Set ADMIN_SECRET env var to a strong random value. The original app used a
// hardcoded password in the browser; here we keep it server-side only.
function requireAdminSecret(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env["ADMIN_SECRET"];
  if (!secret) {
    // If no secret is configured, block all writes in production.
    res.status(503).json({ error: "Admin secret not configured" });
    return;
  }
  const provided =
    req.headers["x-admin-secret"] ||
    (req.body as Record<string, unknown>)?.["adminSecret"];
  if (provided !== secret) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// ── Default data ───────────────────────────────────────────────────────────
const DEFAULT_DATA = {
  socialLinks: [
    { id: "sl-1", platform: "LinkedIn", username: "raghav-vian-panthi", url: "https://linkedin.com/in/raghav-vian-panthi", icon: "Linkedin" },
    { id: "sl-2", platform: "GitHub", username: "Mrcoderv", url: "https://github.com/Mrcoderv", icon: "Github" },
    { id: "sl-3", platform: "Instagram", username: "raghavpanthi", url: "https://instagram.com/raghavpanthi", icon: "Instagram" },
    { id: "sl-4", platform: "YouTube", username: "raghavpanthi", url: "https://youtube.com/@raghavpanthi", icon: "Youtube" },
  ],
  contactInfo: {
    id: "ci-1",
    type: "email",
    label: "Email",
    value: "Raghavap.339@gmail.com",
    icon: "Mail",
  },
  cvUrl: "",
  cvFilename: "raghav_panthi_cv.pdf",
};

const DATA_FILE = join(process.cwd(), "data", "portfolio-data.json");

function readData(): typeof DEFAULT_DATA {
  try {
    if (existsSync(DATA_FILE)) {
      return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as typeof DEFAULT_DATA;
    }
  } catch {
    // fall through to default
  }
  return DEFAULT_DATA;
}

function writeData(data: unknown): void {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ── Read-only routes (public) ──────────────────────────────────────────────
router.get("/portfolio-data", (_req, res) => {
  res.json(readData());
});

router.get("/sync-data", (_req, res) => {
  res.json(readData());
});

// ── Mutating routes (admin-only) ───────────────────────────────────────────
router.post("/portfolio-data", requireAdminSecret, (req, res) => {
  const current = readData();
  const updated = { ...current, ...(req.body as Partial<typeof DEFAULT_DATA>) };
  writeData(updated);
  res.json(updated);
});

router.post("/sync-data", requireAdminSecret, (req, res) => {
  const current = readData();
  const updated = { ...current, ...(req.body as Partial<typeof DEFAULT_DATA>) };
  writeData(updated);
  res.json({ success: true, data: updated });
});

// ── CV upload (admin-only) ─────────────────────────────────────────────────
const ALLOWED_CV_MIMES = new Set(["application/pdf"]);
const CV_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const cvStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dest = join(process.cwd(), "..", "portfolio", "public", "cv");
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Server-generated filename — never trust the original name.
  filename: (_req, _file, cb) => cb(null, `cv-${randomBytes(8).toString("hex")}.pdf`),
});

const cvUpload = multer({
  storage: cvStorage,
  limits: { fileSize: CV_MAX_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_CV_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.post(
  "/upload-cv",
  requireAdminSecret,
  cvUpload.single("file"),
  (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No PDF file provided" });
      return;
    }
    const url = `/cv/${req.file.filename}`;
    const current = readData();
    writeData({ ...current, cvUrl: url, cvFilename: req.file.filename });
    res.json({ url });
  },
);

// ── Image upload (admin-only) ──────────────────────────────────────────────
const ALLOWED_IMG_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_IMG_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const IMG_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const imgStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dest = join(process.cwd(), "..", "portfolio", "public", "media");
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Server-generated filename with validated extension only.
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_IMG_EXTS.has(ext) ? ext : ".jpg";
    cb(null, `img-${randomBytes(8).toString("hex")}${safeExt}`);
  },
});

const imgUpload = multer({
  storage: imgStorage,
  limits: { fileSize: IMG_MAX_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMG_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, or GIF images are allowed"));
    }
  },
});

router.post(
  "/upload-image",
  requireAdminSecret,
  imgUpload.single("file"),
  (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }
    res.json({ url: `/media/${req.file.filename}` });
  },
);

export default router;
