import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Middlewares
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
// const authRoutes = require("./routes/authRoutes");



app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/course", apiRoutes );

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});