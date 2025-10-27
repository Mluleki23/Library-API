import express, { Request, Response } from "express";
import {
  authors,
  addAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../models/author";
import { getBooksByAuthor } from "../models/book";
import { validateAuthorCreate, validateAuthorUpdate } from "../middleware/validation";

const router = express.Router();

// CREATE Author
router.post("/", validateAuthorCreate, (req: Request, res: Response) => {
  const { name, birthYear } = req.body;
  const newAuthor = addAuthor(name, birthYear);
  res.status(201).json(newAuthor);
});

// READ All Authors
router.get("/", (req: Request, res: Response) => {
  res.json(authors);
});

// READ Author by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const author = getAuthorById(id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(author);
});

// UPDATE Author
router.put("/:id", validateAuthorUpdate, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = updateAuthor(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(updated);
});

// DELETE Author
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = deleteAuthor(id);
  if (!deleted) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.status(204).send();
});

// LIST Books by Author
router.get("/:id/books", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const author = getAuthorById(id);
  if (!author) return res.status(404).json({ error: "Author not found" });
  const list = getBooksByAuthor(id);
  res.json(list);
});

export default router;
