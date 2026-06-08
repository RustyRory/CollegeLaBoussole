import { Router, Response, Request } from "express";
import SiteConfig from "../models/SiteConfig.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

// GET /api/site-config — public
router.get("/", async (_req: Request, res: Response) => {
  let config = await SiteConfig.findOne();
  if (!config) {
    config = await SiteConfig.create({});
  }
  res.json(config);
});

// PUT /api/site-config — admin only
router.put(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req: AuthRequest, res: Response) => {
    const config = await SiteConfig.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(config);
  },
);

export default router;
