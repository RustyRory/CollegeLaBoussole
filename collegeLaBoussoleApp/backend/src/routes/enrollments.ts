import { Router, Response } from "express";
import EnrollmentRequest from "../models/EnrollmentRequest.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// GET /api/enrollments — liste toutes les candidatures (admin/staff)
router.get(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (_req: AuthRequest, res: Response) => {
    const enrollments = await EnrollmentRequest.find()
      .populate("requestedYearId", "name")
      .populate("classId", "name")
      .sort({ createdAt: -1 });
    res.json(enrollments);
  },
);

// GET /api/enrollments/:id
router.get(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const enrollment = await EnrollmentRequest.findById(req.params.id)
      .populate("requestedYearId", "name")
      .populate("classId", "name");
    if (!enrollment) {
      res.status(404).json({ message: "Candidature introuvable" });
      return;
    }
    res.json(enrollment);
  },
);

// POST /api/enrollments — créer une candidature (admin/staff)
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const {
      firstName,
      lastName,
      birthDate,
      parentEmail,
      requestedYearId,
      notes,
    } = req.body;
    const enrollment = await EnrollmentRequest.create({
      firstName,
      lastName,
      birthDate,
      parentEmail,
      requestedYearId,
      notes,
    });
    res.status(201).json(enrollment);
  },
);

// PATCH /api/enrollments/:id — modifier le statut, la classe ou les notes
router.patch(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const { status, classId, notes } = req.body;
    const enrollment = await EnrollmentRequest.findByIdAndUpdate(
      req.params.id,
      { status, classId: classId || null, notes },
      { new: true },
    )
      .populate("requestedYearId", "name")
      .populate("classId", "name");
    if (!enrollment) {
      res.status(404).json({ message: "Candidature introuvable" });
      return;
    }
    res.json(enrollment);
  },
);

// DELETE /api/enrollments/:id — supprimer une candidature (admin uniquement)
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await EnrollmentRequest.findByIdAndDelete(req.params.id);
    res.status(204).send();
  },
);

export default router;
