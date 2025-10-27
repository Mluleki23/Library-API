import express from "express";
import {
  authors,
  addAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../models/author";

const router = express.Router();

// CREATE Author
router.post("/", (req, res) => {
  const { name, birthYear } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Author name is required" });
  }
  const newAuthor = addAuthor(name, birthYear);
  res.status(201).json(newAuthor);
});

// READ All Authors
router.get("/", (req, res) => {
  res.json(authors);
});

// READ Author by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const author = getAuthorById(id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(author);
});

// UPDATE Author
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updated = updateAuthor(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(updated);
});

// DELETE Author
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = deleteAuthor(id);
  if (!deleted) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.status(204).send();
});

export default router;
