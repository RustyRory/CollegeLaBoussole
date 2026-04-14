import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// GET /api/users — liste tous les utilisateurs (admin uniquement)
router.get(
  "/",
  requireAuth,
  requireRole("admin"),
  async (_req: AuthRequest, res: Response) => {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  },
);

// GET /api/users/:id
router.get(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }
    res.json(user);
  },
);

// POST /api/users — créer un utilisateur (admin uniquement)
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    const { email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, role });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  },
);

// PATCH /api/users/:id — modifier un utilisateur
router.patch(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    const { role, isActive, isVerified } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, isActive, isVerified },
      { new: true },
    ).select("-passwordHash");
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }
    res.json(user);
  },
);

// DELETE /api/users/:id — désactiver un utilisateur (soft delete)
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(204).send();
  },
);

export default router;
