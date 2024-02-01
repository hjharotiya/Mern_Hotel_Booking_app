import { Request, Response } from "express";

export const validateTokenController = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};
