import { Request, Response } from "express";
import Content from "../models/content.model";
import { addContentInput, addContentSchema } from "../types/zodSchemas";

// Create content - POST
export const addContentHandler = async (req: Request, res: Response) => {
  const result = addContentSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { type, link, title }: addContentInput = result.data;
    const userId = req.userId;

    console.log(userId);

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
      userId: userId,
    });

    res.status(200).json({
      MSG: "Content added",
      content,
    });
    return;
  } catch (error: any) {
    res.status(500).send({
      msg: "Something went wrong.",
      error: error,
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
      contents: contents,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Something went wrong.",
      error: error,
    });
  }
};

// Delete Content - DELETE

export const deleteContentHandler = async (req: Request, res: Response) => {
  const { contentId } = req.body;
  const userId = req.userId;

  try {
    const content = await Content.findOne({
      _id: contentId,
      userId: userId,
    });

    if (!content) {
      res.status(404).send({
        MSG: " Content not found or you don't have access to delete it",
        id: contentId,
      });
      return;
    }

    await Content.deleteOne({
      _id: contentId,
      userId: userId,
    });

    res.status(200).send({
      msg: `Content with ID: ${contentId} is deleted`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting content",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
