import { Router, Response } from "express";
import Year from "../models/Year.js";
import Class from "../models/Class.js";
import Register from "../models/Register.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// GET /api/years
router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const years = await Year.find().sort({ startDate: -1 });
  res.json(years);
});

// GET /api/years/:id
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const year = await Year.findById(req.params.id);
  if (!year) {
    res.status(404).json({ message: "Année introuvable" });
    return;
  }
  res.json(year);
});

// GET /api/years/:id/classes — classes de l'année avec leur nombre d'élèves
router.get(
  "/:id/classes",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const classes = await Class.find({ yearId: req.params.id }).populate(
      "teacherId",
      "email",
    );

    // Compter les élèves par classe
    const classIds = classes.map((c) => c._id);
    const counts = await Register.aggregate([
      { $match: { classId: { $in: classIds } } },
      { $group: { _id: "$classId", count: { $sum: 1 } } },
    ]);
    const countMap = Object.fromEntries(
      counts.map((c) => [String(c._id), c.count]),
    );

    const result = classes.map((c) => ({
      ...c.toObject(),
      studentCount: countMap[String(c._id)] ?? 0,
    }));

    res.json(result);
  },
);

// POST /api/years
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const year = await Year.create(req.body);
    res.status(201).json(year);
  },
);

// PATCH /api/years/:id
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

// DELETE /api/years/:id
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
