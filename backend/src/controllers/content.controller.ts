import { Request, Response } from "express";
import Content from "../models/content.model";

// Create content - POST
export const addContentHandler = async (req: Request, res: Response) => {
  try {
    const { type, link, title, tags } = req.body;
    const userId = req.userId;

    console.log(userId)

    const existingContent = await Content.findOne({
      link: link,
    });

    if (existingContent) {
      res.status(401).json({
        msg: "Content with same link already exists.",
      });

      return;
    }

    const content = await Content.create({
      link: link,
      type: type,
      title: title,
      tags: tags,
      userId: userId
    });

    res.status(200).json({
      MSG: "Content added",
      content,
    });
    return;
  } catch (error: any) {
    res.status(500).send({
      msg: "Internal server error.",
      error: error
    });
  }
};

// View Content - GET
export const getContentHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    // Find all content for given userID

    const contents = await Content.find({
      userId: userId,
    });

    if (!contents) {
      res.status(404).send({
        msg: `No content found for userId: ${userId}`,
      });
      return;
    }
    
    res.status(200).json({
        msg: "Contents fetched successfully",
        contents: contents
    })
  } catch (error) {}
};
