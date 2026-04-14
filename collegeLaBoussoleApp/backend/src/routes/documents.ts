import { Router, Response } from "express";
import DocumentModel from "../models/Document.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /api/documents?folderId=xxx — liste les documents d'un dossier
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const folderId =
    typeof req.query.folderId === "string" ? req.query.folderId : null;
  const docs = await DocumentModel.find({ folderId }).populate(
    "uploadedBy",
    "email",
  );
  res.json(docs);
});

// GET /api/documents/:id
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const doc = await DocumentModel.findById(req.params.id);
  if (!doc) {
    res.status(404).json({ message: "Document introuvable" });
    return;
  }
  res.json(doc);
});

// POST /api/documents — créer un document ou dossier
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const doc = await DocumentModel.create({
    ...req.body,
    uploadedBy: req.user?.id,
    ownerId: req.user?.id,
  });
  res.status(201).json(doc);
});

// PATCH /api/documents/:id
router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const doc = await DocumentModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) {
    res.status(404).json({ message: "Document introuvable" });
    return;
  }
  res.json(doc);
});

// DELETE /api/documents/:id
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  await DocumentModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
