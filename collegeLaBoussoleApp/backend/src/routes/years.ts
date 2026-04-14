import { Router, Response } from "express";
import Year from "../models/Year.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const years = await Year.find().sort({ startDate: -1 });
  res.json(years);
});

router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const year = await Year.create(req.body);
    res.status(201).json(year);
  },
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const year = await Year.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!year) {
      res.status(404).json({ message: "Année introuvable" });
      return;
    }
    res.json(year);
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await Year.findByIdAndDelete(req.params.id);
    res.status(204).send();
  },
);

export default router;
