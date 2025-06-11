import { Request, Response } from "express";
import { shareBrainInput, shareBrainSchema } from "../types/zodSchemas";
import PublicLink from "../models/publicLink.model";
import { nanoid } from "nanoid";
import Content from "../models/content.model";

export const shareBrainHandler = async (req: Request, res: Response) => {
  const result = shareBrainSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { share }: shareBrainInput = result.data;
    const userId = req.userId;

    if (!share) {
      await PublicLink.deleteOne({
        userId: req.userId,
      });

      res.status(200).send({
        msg: "Removed the Public workspace link",
      });
      return;
    }

    const existingLink = await PublicLink.findOne({
      userId: userId,
    });

    if (existingLink) {
      res.status(200).send({
        msg: "Public Link exists",
        link: existingLink.hash,
      });

      return;
    }

    const hash = nanoid(10);

    await PublicLink.create({
      userId: userId,
      hash: hash,
    });

    res.status(200).json({
      msg: "Public Link created successfully",
      hash: hash,
    });
  } catch (error: any) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

export const getBrainforPublic = async (req: Request, res: Response) => {
  try {
    const shareId = req.params.shareId;
    const link = await PublicLink.findOne({
      hash: shareId,
    });

    if (!link) {
      res.status(404).json({
        msg: "Public link not found",
      });
      return;
    }

    const contents = await Content.find({
      userId: link.userId,
    }).populate("userId", "username");

    res.status(200).json({
      msg: "Contents for given public url fetched successfully",
      contents: contents,
    });
  } catch (error: any) {
    res.status(500).json({
      msg: "Something went wrong.",
      error: error,
    });
  }
};
