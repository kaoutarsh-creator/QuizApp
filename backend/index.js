import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/quizapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/quizzes", quizRoutes);

app.listen(5000, () => {
  console.log("Server Running");
});