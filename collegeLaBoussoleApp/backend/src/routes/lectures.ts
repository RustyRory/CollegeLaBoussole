import { Router, Response } from "express";
import Lecture from "../models/Lecture.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const lectures = await Lecture.find()
    .populate("classId", "name")
    .populate("teacherId", "email");
  res.json(lectures);
});

router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const lecture = await Lecture.create(req.body);
    res.status(201).json(lecture);
  },
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lecture) {
      res.status(404).json({ message: "Cours introuvable" });
      return;
    }
    res.json(lecture);
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    await Lecture.findByIdAndDelete(req.params.id);
    res.status(204).send();
  },
);

export default router;
