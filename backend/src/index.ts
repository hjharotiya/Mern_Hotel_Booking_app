import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoute from "./routes/authRoute";
import myHotelsRoutes from "./routes/my-hotelRoute";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudniary } from "cloudinary";

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

cloudniary.config({
  cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET,
});

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
app.use("/api/my-hotels", myHotelsRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(4000, () => {
  console.log("server is running on local host 4000");
});
