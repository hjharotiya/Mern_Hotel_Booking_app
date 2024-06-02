import { Request, RequestHandler, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../model/hotel";
import { HotelType } from "../shared/types";

// export const myHotelController =
export const viewHotelsController = async (req: Request, res: Response) => {
  const hotels = await Hotel.find({ userId: req.userId });
  res.json(hotels);

  try {
  } catch (error) {
    res.status(500).json({ message: "Error in Fetching Hotels" });
  }
};

// HOTEL EDIT CONTROLLER

export const editHotelController = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error in Fetching Hotels" });
  }
};

// export const editImageController = async
// };
