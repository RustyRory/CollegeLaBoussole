import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import yearsRoutes from "./routes/years.js";
import classesRoutes from "./routes/classes.js";
import lecturesRoutes from "./routes/lectures.js";
import documentsRoutes from "./routes/documents.js";
import groupsRoutes from "./routes/groups.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/years", yearsRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/lectures", lecturesRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/groups", groupsRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(PORT, () =>
      console.log(`Serveur démarré sur http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Erreur connexion MongoDB :", err);
    process.exit(1);
  });
