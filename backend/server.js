import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tutorialRoutes from "./routes/tutorialRoutes.js";

dotenv.config();

const app =express();

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/tutorials", tutorialRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("hello nodejs backend is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});