import { Router, Response } from "express";
import Class from "../models/Class.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const classes = await Class.find()
    .populate("yearId", "name")
    .populate("teacherId", "email");
  res.json(classes);
});

router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const classe = await Class.create(req.body);
    res.status(201).json(classe);
  },
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const classe = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classe) {
      res.status(404).json({ message: "Classe introuvable" });
      return;
    }
    res.json(classe);
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await Class.findByIdAndDelete(req.params.id);
    res.status(204).send();
  },
);

export default router;
