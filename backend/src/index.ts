import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";
import path from "path";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(
//       process.env.MONGODB_CONNECTION_STRING as string
//     );
//     console.log("database is connected");
//   } catch (error) {
//     console.log(`error in database ${error}`);
//   }
// };
// connectDB();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log("Connected to database:", process.env.MONGODB_CONNECTION_STRING)
  );

const app = express();
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);

app.listen(4000, () => {
  console.log("server is running on local host 4000");
});
