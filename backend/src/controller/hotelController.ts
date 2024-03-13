import { Request, RequestHandler, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../model/hotel";

// export const myHotelController =
export const viewHotelsController = async (req: Request, res: Response) => {
  const hotels = await Hotel.find({ userId: req.userId });
  res.json(hotels);

  try {
  } catch (error) {
    res.status(500).json({ message: "Error in Fetching Hotels" });
  }
};
