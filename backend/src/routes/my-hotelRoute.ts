import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import express from "express";
import Hotel from "../model/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/authMiddlewear";
import { body } from "express-validator";
import { viewHotelsController } from "../controller/hotelController";
// import { myHotelController } from '../controller/hotelController';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("type").notEmpty().withMessage("Hotel type is Required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is Required Must be a Number"),
    body("facilities").notEmpty().withMessage("Facilities is Required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //  1. Upload images to cloudniary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
      //  2. if upload is successful, add the Urls to new Hotel
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //  3. Save the new hotel in owr Database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. return a 201 status
      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error in creating hotel :", error);
    }
  }
);

router.get("/", verifyToken, viewHotelsController);

export default router;
