import Comment from "../models/Comment.js";
import { findDocumentById, isValidObjectId } from "../utils/index.js";

const createAComment = async (req, res) => {
  try {
    const { bookId, content, userId } = req.body;

    const newComment = await Comment.create({
      content: content,
      book: bookId,
      postedBy: userId,
    });

    return res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.error("Error at createComment", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate({
      path: "postedBy",
      select: "username",
    });
    res.status(200).json({ message: "Comments fetched", comments });
  } catch (error) {
    console.error("Error at getAllComments", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getCommentsForBook = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ book: id }).populate("postedBy");

    return res
      .status(201)
      .json({ message: "Comments for book fetched", comments });
  } catch (error) {
    console.error("Error at getCommentsForBook", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const getCommentsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ postedBy: id }).populate("book");
    return res
      .status(201)
      .json({ message: "Comments for book fetched", comments });
  } catch (error) {
    console.error("Error at getCommentsByUser", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const updateAComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (isValidObjectId(id, res)) return;

  try {
    const comment = await findDocumentById(Comment, id, res);
    if (!comment) return;

    comment.content = content || comment.content;

    await comment.save();

    res
      .status(200)
      .json({ message: "The comment updated successfully!", comment });
  } catch (error) {
    console.error("Error at updateAComment", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createAComment,
  getCommentsForBook,
  getCommentsByUser,
  updateAComment,
  getAllComments,
};
