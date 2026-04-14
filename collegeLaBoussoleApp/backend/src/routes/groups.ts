import { Router, Response } from "express";
import Group from "../models/Group.js";
import GroupUser from "../models/GroupUser.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  const groups = await Group.find();
  res.json(groups);
});

router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  },
);

// POST /api/groups/:id/members — ajouter un membre
router.post(
  "/:id/members",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    const userId = String(req.body.userId);
    const member = await GroupUser.create({
      groupId: String(req.params.id),
      userId,
    });
    res.status(201).json(member);
  },
);

// DELETE /api/groups/:id/members/:userId — retirer un membre
router.delete(
  "/:id/members/:userId",
  requireAuth,
  requireRole("admin", "staff"),
  async (req: AuthRequest, res: Response) => {
    await GroupUser.findOneAndDelete({
      groupId: String(req.params.id),
      userId: String(req.params.userId),
    });
    res.status(204).send();
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    await Group.findByIdAndDelete(req.params.id);
    res.status(204).send();
  },
);

export default router;
