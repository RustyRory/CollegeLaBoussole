import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import StaffProfile from "./models/StaffProfile.js";
import ParentProfile from "./models/ParentProfile.js";
import StudentProfile from "./models/StudentProfile.js";
import ParentStudent from "./models/ParentStudent.js";
import Year from "./models/Year.js";
import Class from "./models/Class.js";
import Lecture from "./models/Lecture.js";
import Register from "./models/Register.js";
import Document from "./models/Document.js";
import Group from "./models/Group.js";
import GroupUser from "./models/GroupUser.js";
import EnrollmentRequest from "./models/EnrollmentRequest.js";

const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/collegeLaBoussole";

const hash = (pwd: string) => bcrypt.hash(pwd, 12);

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connecté");

  // ── Nettoyage ────────────────────────────────────────────────────────────────
  await Promise.all([
    User.deleteMany({}),
    StaffProfile.deleteMany({}),
    ParentProfile.deleteMany({}),
    StudentProfile.deleteMany({}),
    ParentStudent.deleteMany({}),
    Year.deleteMany({}),
    Class.deleteMany({}),
    Lecture.deleteMany({}),
    Register.deleteMany({}),
    Document.deleteMany({}),
    Group.deleteMany({}),
    GroupUser.deleteMany({}),
    EnrollmentRequest.deleteMany({}),
  ]);
  console.log("🗑️  Collections vidées");

  // ── Utilisateurs ─────────────────────────────────────────────────────────────
  const [
    adminUser,
    directionUser,
    teacherMath,
    teacherFr,
    parent1,
    parent2,
    student1,
    student2,
    student3,
  ] = await User.insertMany([
    {
      email: "admin@collegelaboussole.org",
      passwordHash: await hash("Admin1234!"),
      role: "admin",
      isActive: true,
      isVerified: true,
    },
    {
      email: "direction@collegelaboussole.org",
      passwordHash: await hash("Staff1234!"),
      role: "staff",
      isActive: true,
      isVerified: true,
    },
    {
      email: "m.dubois@collegelaboussole.org",
      passwordHash: await hash("Staff1234!"),
      role: "staff",
      isActive: true,
      isVerified: true,
    },
    {
      email: "s.martin@collegelaboussole.org",
      passwordHash: await hash("Staff1234!"),
      role: "staff",
      isActive: true,
      isVerified: true,
    },
    {
      email: "parent.leroy@gmail.com",
      passwordHash: await hash("Parent1234!"),
      role: "parent",
      isActive: true,
      isVerified: true,
    },
    {
      email: "parent.nguyen@gmail.com",
      passwordHash: await hash("Parent1234!"),
      role: "parent",
      isActive: true,
      isVerified: true,
    },
    {
      email: "eleve.leroy@collegelaboussole.org",
      passwordHash: await hash("Eleve1234!"),
      role: "student",
      isActive: true,
      isVerified: true,
    },
    {
      email: "eleve.nguyen@collegelaboussole.org",
      passwordHash: await hash("Eleve1234!"),
      role: "student",
      isActive: true,
      isVerified: true,
    },
    {
      email: "eleve.bernard@collegelaboussole.org",
      passwordHash: await hash("Eleve1234!"),
      role: "student",
      isActive: true,
      isVerified: false,
    },
  ]);
  console.log("👤 Utilisateurs créés");

  // ── Profils staff ─────────────────────────────────────────────────────────────
  await StaffProfile.insertMany([
    { userId: adminUser._id, role: "admin" },
    { userId: directionUser._id, role: "owner" },
    { userId: teacherMath._id, role: "teacher" },
    { userId: teacherFr._id, role: "teacher" },
  ]);
  console.log("🏫 Profils staff créés");

  // ── Profils parents ───────────────────────────────────────────────────────────
  const [parentProfile1, parentProfile2] = await ParentProfile.insertMany([
    { userId: parent1._id },
    { userId: parent2._id },
  ]);
  console.log("👨‍👩‍👧 Profils parents créés");

  // ── Profils élèves ────────────────────────────────────────────────────────────
  const [studentProfile1, studentProfile2, studentProfile3] =
    await StudentProfile.insertMany([
      {
        userId: student1._id,
        firstName: "Lucas",
        lastName: "Leroy",
        birthDate: new Date("2013-03-14"),
      },
      {
        userId: student2._id,
        firstName: "Emma",
        lastName: "Nguyen",
        birthDate: new Date("2013-07-22"),
      },
      {
        userId: student3._id,
        firstName: "Noah",
        lastName: "Bernard",
        birthDate: new Date("2012-11-05"),
      },
    ]);
  console.log("🎒 Profils élèves créés");

  // ── Liens parent ↔ élève ──────────────────────────────────────────────────────
  await ParentStudent.insertMany([
    { parentId: parentProfile1._id, studentId: studentProfile1._id },
    { parentId: parentProfile2._id, studentId: studentProfile2._id },
  ]);
  console.log("🔗 Liens parent-élève créés");

  // ── Années scolaires ──────────────────────────────────────────────────────────
  const [year2526, year2627] = await Year.insertMany([
    {
      name: "2025-2026",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-07-04"),
      status: "active",
    },
    {
      name: "2026-2027",
      startDate: new Date("2026-09-07"),
      endDate: new Date("2027-07-03"),
      status: "future",
    },
  ]);
  console.log("📅 Années scolaires créées");

  // ── Classes ───────────────────────────────────────────────────────────────────
  const [classe6A, classe6B, classe5A, classe4A, classe3A] =
    await Class.insertMany([
      { name: "6ème A", yearId: year2526._id, teacherId: teacherMath._id },
      { name: "6ème B", yearId: year2526._id, teacherId: teacherFr._id },
      { name: "5ème A", yearId: year2526._id, teacherId: teacherMath._id },
      { name: "4ème A", yearId: year2526._id, teacherId: teacherFr._id },
      { name: "3ème A", yearId: year2526._id, teacherId: teacherMath._id },
    ]);
  console.log("🏛️  Classes créées");

  // ── Cours ─────────────────────────────────────────────────────────────────────
  await Lecture.insertMany([
    // 6ème A
    {
      name: "Mathématiques",
      classId: classe6A._id,
      teacherId: teacherMath._id,
      day: "lundi",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      name: "Français",
      classId: classe6A._id,
      teacherId: teacherFr._id,
      day: "lundi",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      name: "Mathématiques",
      classId: classe6A._id,
      teacherId: teacherMath._id,
      day: "mercredi",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      name: "Histoire-Géographie",
      classId: classe6A._id,
      teacherId: teacherFr._id,
      day: "mardi",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      name: "SVT",
      classId: classe6A._id,
      teacherId: teacherMath._id,
      day: "jeudi",
      startTime: "14:00",
      endTime: "15:00",
    },
    // 6ème B
    {
      name: "Mathématiques",
      classId: classe6B._id,
      teacherId: teacherMath._id,
      day: "lundi",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      name: "Français",
      classId: classe6B._id,
      teacherId: teacherFr._id,
      day: "mardi",
      startTime: "08:00",
      endTime: "09:00",
    },
    // 5ème A
    {
      name: "Mathématiques",
      classId: classe5A._id,
      teacherId: teacherMath._id,
      day: "lundi",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      name: "Français",
      classId: classe5A._id,
      teacherId: teacherFr._id,
      day: "jeudi",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      name: "Anglais",
      classId: classe5A._id,
      teacherId: teacherFr._id,
      day: "vendredi",
      startTime: "10:00",
      endTime: "11:00",
    },
    // 4ème A
    {
      name: "Mathématiques",
      classId: classe4A._id,
      teacherId: teacherMath._id,
      day: "mardi",
      startTime: "14:00",
      endTime: "15:00",
    },
    // 3ème A
    {
      name: "Mathématiques",
      classId: classe3A._id,
      teacherId: teacherMath._id,
      day: "mercredi",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      name: "Français",
      classId: classe3A._id,
      teacherId: teacherFr._id,
      day: "vendredi",
      startTime: "08:00",
      endTime: "09:00",
    },
  ]);
  console.log("📚 Cours créés");

  // ── Inscriptions élèves ───────────────────────────────────────────────────────
  await Register.insertMany([
    { userId: student1._id, classId: classe6A._id },
    { userId: student2._id, classId: classe6A._id },
    { userId: student3._id, classId: classe5A._id },
  ]);
  console.log("📝 Inscriptions élèves créées");

  // ── Documents ─────────────────────────────────────────────────────────────────
  const folderGeneral = await Document.create({
    titre: "Documents généraux",
    url: "/documents/generaux",
    type: "folder",
    ownerId: adminUser._id,
    uploadedBy: adminUser._id,
    inheritPermissions: false,
    tags: ["general"],
  });

  const folderPedago = await Document.create({
    titre: "Pédagogie",
    url: "/documents/pedagogie",
    type: "folder",
    ownerId: directionUser._id,
    uploadedBy: directionUser._id,
    inheritPermissions: false,
    tags: ["pedagogie"],
  });

  const folderClasse6A = await Document.create({
    titre: "6ème A",
    url: "/documents/classes/6a",
    type: "folder",
    ownerId: teacherMath._id,
    uploadedBy: teacherMath._id,
    inheritPermissions: false,
    classId: classe6A._id,
    tags: ["6eme", "classe"],
  });

  await Document.insertMany([
    {
      titre: "Règlement intérieur 2025-2026",
      url: "/documents/generaux/reglement-interieur.pdf",
      type: "file",
      folderId: folderGeneral._id,
      ownerId: adminUser._id,
      uploadedBy: adminUser._id,
      inheritPermissions: true,
      yearId: year2526._id,
      tags: ["reglement", "important"],
    },
    {
      titre: "Calendrier scolaire 2025-2026",
      url: "/documents/generaux/calendrier-scolaire.pdf",
      type: "file",
      folderId: folderGeneral._id,
      ownerId: adminUser._id,
      uploadedBy: adminUser._id,
      inheritPermissions: true,
      yearId: year2526._id,
      tags: ["calendrier"],
    },
    {
      titre: "Fournitures scolaires",
      url: "/documents/generaux/fournitures.pdf",
      type: "file",
      folderId: folderGeneral._id,
      ownerId: adminUser._id,
      uploadedBy: adminUser._id,
      inheritPermissions: true,
      yearId: year2526._id,
      tags: ["fournitures"],
    },
    {
      titre: "Projet pédagogique du collège",
      url: "/documents/pedagogie/projet-pedagogique.pdf",
      type: "file",
      folderId: folderPedago._id,
      ownerId: directionUser._id,
      uploadedBy: directionUser._id,
      inheritPermissions: true,
      tags: ["projet", "pedagogie"],
    },
    {
      titre: "Charte numérique",
      url: "/documents/pedagogie/charte-numerique.pdf",
      type: "file",
      folderId: folderPedago._id,
      ownerId: directionUser._id,
      uploadedBy: directionUser._id,
      inheritPermissions: true,
      tags: ["charte", "numerique"],
    },
    {
      titre: "Emploi du temps — 6ème A",
      url: "/documents/classes/6a/emploi-du-temps.pdf",
      type: "file",
      folderId: folderClasse6A._id,
      ownerId: teacherMath._id,
      uploadedBy: teacherMath._id,
      inheritPermissions: true,
      classId: classe6A._id,
      yearId: year2526._id,
      tags: ["emploi-du-temps", "6eme"],
    },
    {
      titre: "Liste des élèves — 6ème A",
      url: "/documents/classes/6a/liste-eleves.pdf",
      type: "file",
      folderId: folderClasse6A._id,
      ownerId: teacherMath._id,
      uploadedBy: teacherMath._id,
      inheritPermissions: true,
      classId: classe6A._id,
      yearId: year2526._id,
      tags: ["eleves", "6eme"],
    },
  ]);
  console.log("📄 Documents créés");

  // ── Groupes ───────────────────────────────────────────────────────────────────
  const [groupStaff, groupParents6A, groupEleves6A, groupEleves6B] =
    await Group.insertMany([
      {
        name: "Équipe pédagogique",
        type: "staff",
        yearId: year2526._id,
      },
      {
        name: "Parents — 6ème A",
        type: "parents",
        classId: classe6A._id,
        yearId: year2526._id,
      },
      {
        name: "6ème A",
        type: "class",
        classId: classe6A._id,
        yearId: year2526._id,
      },
      {
        name: "6ème B",
        type: "class",
        classId: classe6B._id,
        yearId: year2526._id,
      },
    ]);

  await GroupUser.insertMany([
    { groupId: groupStaff._id, userId: directionUser._id },
    { groupId: groupStaff._id, userId: teacherMath._id },
    { groupId: groupStaff._id, userId: teacherFr._id },
    { groupId: groupParents6A._id, userId: parent1._id },
    { groupId: groupParents6A._id, userId: parent2._id },
    { groupId: groupEleves6A._id, userId: student1._id },
    { groupId: groupEleves6A._id, userId: student2._id },
    { groupId: groupEleves6B._id, userId: student3._id },
  ]);
  console.log("👥 Groupes et membres créés");

  // ── Candidatures d'inscription ────────────────────────────────────────────────
  await EnrollmentRequest.insertMany([
    {
      firstName: "Léa",
      lastName: "Moreau",
      birthDate: new Date("2013-05-18"),
      parentEmail: "parent.moreau@gmail.com",
      requestedYearId: year2627._id,
      status: "pending",
      notes: "Dossier complet reçu le 05/06/2026",
    },
    {
      firstName: "Tom",
      lastName: "Petit",
      birthDate: new Date("2013-09-30"),
      parentEmail: "parent.petit@gmail.com",
      requestedYearId: year2627._id,
      status: "pending",
    },
    {
      firstName: "Chloé",
      lastName: "Faure",
      birthDate: new Date("2014-01-12"),
      parentEmail: "parent.faure@gmail.com",
      requestedYearId: year2627._id,
      status: "approved",
      classId: classe6A._id,
      notes: "Acceptée — classe 6ème A confirmée",
    },
    {
      firstName: "Hugo",
      lastName: "Simon",
      birthDate: new Date("2013-11-25"),
      parentEmail: "parent.simon@gmail.com",
      requestedYearId: year2627._id,
      status: "rejected",
      notes: "Dossier incomplet malgré relance",
    },
    {
      firstName: "Inès",
      lastName: "Blanc",
      birthDate: new Date("2012-06-08"),
      parentEmail: "parent.blanc@gmail.com",
      requestedYearId: year2627._id,
      status: "pending",
    },
  ]);
  console.log("📋 Candidatures d'inscription créées");

  // ── Résumé ────────────────────────────────────────────────────────────────────
  console.log("\n══════════════════════════════════════════════");
  console.log("  🎓  SEED TERMINÉ — Collège La Boussole");
  console.log("══════════════════════════════════════════════");
  console.log("\n  COMPTES DE DÉMO\n");
  console.log("  Rôle       Email                                Mot de passe");
  console.log("  ─────────────────────────────────────────────────────────────");
  console.log("  admin      admin@collegelaboussole.org          Admin1234!");
  console.log("  staff      direction@collegelaboussole.org      Staff1234!");
  console.log("  staff      m.dubois@collegelaboussole.org       Staff1234!");
  console.log("  staff      s.martin@collegelaboussole.org       Staff1234!");
  console.log("  parent     parent.leroy@gmail.com               Parent1234!");
  console.log("  parent     parent.nguyen@gmail.com              Parent1234!");
  console.log("  student    eleve.leroy@collegelaboussole.org    Eleve1234!");
  console.log("  student    eleve.nguyen@collegelaboussole.org   Eleve1234!");
  console.log("\n══════════════════════════════════════════════\n");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Erreur seed :", err);
  process.exit(1);
});
