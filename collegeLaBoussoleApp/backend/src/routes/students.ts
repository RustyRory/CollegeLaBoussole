import { Router, Response } from "express";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import ParentProfile from "../models/ParentProfile.js";
import ParentStudent from "../models/ParentStudent.js";
import Register from "../models/Register.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// Helper : formate un étudiant enrichi de son profil
async function formatStudent(profile: InstanceType<typeof StudentProfile>) {
  const user = await User.findById(profile.userId).select("email isActive");
  return {
    _id: profile.userId,
    profileId: profile._id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    birthDate: profile.birthDate,
    email: user?.email ?? "",
    isActive: user?.isActive ?? true,
  };
}

// GET /api/students — tous les élèves avec profil
router.get(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (_req: AuthRequest, res: Response) => {
    const profiles = await StudentProfile.find().sort({
      lastName: 1,
      firstName: 1,
    });
    const students = await Promise.all(profiles.map(formatStudent));
    res.json(students);
  },
);

// GET /api/students/unassigned — élèves sans classe
router.get(
  "/unassigned",
  requireAuth,
  requireRole("admin", "staff"),
  async (_req: AuthRequest, res: Response) => {
    const enrolledIds = await Register.distinct("userId");
    const profiles = await StudentProfile.find({
      userId: { $nin: enrolledIds },
    }).sort({ lastName: 1, firstName: 1 });
    const students = await Promise.all(profiles.map(formatStudent));
    res.json(students);
  },
);

// POST /api/students — créer un élève
// Body: { firstName, lastName, birthDate, parentUserId? }
// - Crée un User role=student (sans mot de passe utilisable)
// - Crée un StudentProfile
// - Si parentUserId fourni : lie au parent via ParentStudent
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const { firstName, lastName, birthDate, parentUserId } = req.body as {
      firstName: string;
      lastName: string;
      birthDate: string;
      parentUserId?: string;
    };

    // Email interne unique (l'élève ne se connecte jamais)
    const slug = `${firstName.toLowerCase().replace(/\s+/g, "")}.${lastName.toLowerCase().replace(/\s+/g, "")}`;
    const email = `${slug}.${randomUUID().split("-")[0]}@eleve.internal`;

    // Hash aléatoire — l'élève ne peut pas se connecter
    const passwordHash = await bcrypt.hash(randomUUID(), 12);

    const user = await User.create({ email, passwordHash, role: "student" });

    const profile = await StudentProfile.create({
      userId: user._id,
      firstName,
      lastName,
      birthDate: new Date(birthDate),
    });

    // Lien parent → élève
    if (parentUserId) {
      let parentProfile = await ParentProfile.findOne({ userId: parentUserId });
      if (!parentProfile) {
        parentProfile = await ParentProfile.create({ userId: parentUserId });
      }
      await ParentStudent.create({
        parentId: parentProfile._id,
        studentId: profile._id,
      });
    }

    res.status(201).json({
      _id: user._id,
      profileId: profile._id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: profile.birthDate,
      email: user.email,
      isActive: user.isActive,
    });
  },
);

// DELETE /api/students/:id — supprimer un élève (userId)
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;
    const profile = await StudentProfile.findOneAndDelete({ userId });
    if (profile) {
      await ParentStudent.deleteMany({ studentId: profile._id });
    }
    await Register.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  },
);

export default router;
