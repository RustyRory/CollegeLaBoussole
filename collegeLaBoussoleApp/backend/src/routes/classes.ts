import { Router, Response } from "express";
import Class from "../models/Class.js";
import Register from "../models/Register.js";
import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";
import Lecture from "../models/Lecture.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// GET /api/classes
router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const classes = await Class.find()
    .populate("yearId", "name")
    .populate("teacherId", "email");
  res.json(classes);
});

// GET /api/classes/:id
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const classe = await Class.findById(req.params.id)
    .populate("yearId", "name startDate endDate status")
    .populate("teacherId", "email role");
  if (!classe) {
    res.status(404).json({ message: "Classe introuvable" });
    return;
  }
  res.json(classe);
});

// GET /api/classes/:id/students — élèves inscrits avec leur profil
router.get(
  "/:id/students",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const registers = await Register.find({ classId: req.params.id });
    const userIds = registers.map((r) => r.userId);

    const profiles = await StudentProfile.find({ userId: { $in: userIds } });
    const users = await User.find({ _id: { $in: userIds } }).select(
      "email isActive",
    );

    const userMap = Object.fromEntries(users.map((u) => [String(u._id), u]));

    const students = profiles.map((p) => {
      const user = userMap[String(p.userId)];
      return {
        _id: p.userId,
        profileId: p._id,
        firstName: p.firstName,
        lastName: p.lastName,
        birthDate: p.birthDate,
        email: user?.email ?? "",
        isActive: user?.isActive ?? true,
      };
    });

    res.json(students);
  },
);

// POST /api/classes/:id/students — inscrire un élève existant
router.post(
  "/:id/students",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const { userId } = req.body as { userId: string };
    const classId = String(req.params.id);
    const existing = await Register.findOne({ classId, userId });
    if (existing) {
      res.status(409).json({ message: "Élève déjà inscrit dans cette classe" });
      return;
    }
    await Register.create({ classId, userId });

    const profile = await StudentProfile.findOne({ userId });
    const user = await User.findById(userId).select("email isActive");
    res.status(201).json({
      _id: userId,
      profileId: profile?._id,
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      birthDate: profile?.birthDate,
      email: user?.email ?? "",
      isActive: user?.isActive ?? true,
    });
  },
);

// DELETE /api/classes/:id/students/:userId — retirer un élève
router.delete(
  "/:id/students/:userId",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    await Register.findOneAndDelete({
      classId: String(req.params.id),
      userId: String(req.params.userId),
    });
    res.status(204).send();
  },
);

// GET /api/classes/:id/lectures — cours de la classe
router.get(
  "/:id/lectures",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const lectures = await Lecture.find({ classId: req.params.id })
      .populate("teacherId", "email")
      .sort({ day: 1, startTime: 1 });
    res.json(lectures);
  },
);

// POST /api/classes/:id/lectures — créer un cours pour cette classe
router.post(
  "/:id/lectures",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const lecture = await Lecture.create({
      ...req.body,
      classId: req.params.id,
    });
    const populated = await Lecture.findById(lecture._id).populate(
      "teacherId",
      "email",
    );
    res.status(201).json(populated);
  },
);

// PATCH /api/classes/:id/lectures/:lectureId
router.patch(
  "/:id/lectures/:lectureId",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.lectureId,
      req.body,
      { new: true },
    ).populate("teacherId", "email");
    if (!lecture) {
      res.status(404).json({ message: "Cours introuvable" });
      return;
    }
    res.json(lecture);
  },
);

// DELETE /api/classes/:id/lectures/:lectureId
router.delete(
  "/:id/lectures/:lectureId",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    await Lecture.findByIdAndDelete(req.params.lectureId);
    res.status(204).send();
  },
);

// POST /api/classes
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const classe = await Class.create(req.body);
    res.status(201).json(classe);
  },
);

// PATCH /api/classes/:id
router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const classe = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("yearId", "name")
      .populate("teacherId", "email");
    if (!classe) {
      res.status(404).json({ message: "Classe introuvable" });
      return;
    }
    res.json(classe);
  },
);

// DELETE /api/classes/:id
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await Class.findByIdAndDelete(req.params.id);
    await Register.deleteMany({ classId: req.params.id });
    await Lecture.deleteMany({ classId: req.params.id });
    res.status(204).send();
  },
);

export default router;
