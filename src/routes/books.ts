import express, { Request, Response } from "express";
import { books, addBook, getBookById, updateBook, deleteBook } from "../models/book";
import { getAuthorById } from "../models/author";
import { validateBookCreate, validateBookUpdate } from "../middleware/validation";

const router = express.Router();

router.post("/", validateBookCreate, (req: Request, res: Response) => {
  const { title, authorId, year } = req.body;
  const author = getAuthorById(Number(authorId));
  if (!author) {
    return res.status(400).json({ error: "Invalid authorId" });
  }
  const duplicate = books.find(
    (b) => b.title.toLowerCase() === String(title).toLowerCase() && b.authorId === Number(authorId)
  );
  if (duplicate) {
    return res.status(409).json({ error: "Duplicate book for this author" });
  }
  const newBook = addBook(title, Number(authorId), year);
  res.status(201).json(newBook);
});

router.get("/", (req: Request, res: Response) => {
  let results = [...books];
  const { title, author, year, sortBy, order = "asc", page = "1", limit = "10" } = req.query as Record<string, string>;

  if (title) {
    const q = title.toLowerCase();
    results = results.filter((b) => b.title.toLowerCase().includes(q));
  }
  if (author) {
    const aid = Number(author);
    if (!Number.isNaN(aid)) results = results.filter((b) => b.authorId === aid);
  }
  if (year) {
    const y = Number(year);
    if (!Number.isNaN(y)) results = results.filter((b) => b.year === y);
  }

  if (sortBy) {
    const key = sortBy as "title" | "year" | "id";
    results.sort((a: any, b: any) => {
      const va = a[key] ?? "";
      const vb = b[key] ?? "";
      if (va < vb) return order === "desc" ? 1 : -1;
      if (va > vb) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const limitNum = Math.max(1, parseInt(String(limit), 10) || 10);
  const start = (pageNum - 1) * limitNum;
  const paged = results.slice(start, start + limitNum);

  res.json({ total: results.length, page: pageNum, limit: limitNum, data: paged });
});

router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = getBookById(id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

router.put("/:id", validateBookUpdate, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const existing = getBookById(id);
  if (!existing) return res.status(404).json({ error: "Book not found" });

  const payload = { ...req.body };
  if (payload.authorId !== undefined) {
    const aid = Number(payload.authorId);
    if (!getAuthorById(aid)) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
  }
  if (payload.title !== undefined) {
    const t = String(payload.title).toLowerCase();
    const aid = payload.authorId !== undefined ? Number(payload.authorId) : existing.authorId;
    const dup = books.find((b) => b.id !== id && b.authorId === aid && b.title.toLowerCase() === t);
    if (dup) return res.status(409).json({ error: "Duplicate book for this author" });
  }

  const updated = updateBook(id, payload);
  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = deleteBook(id);
  if (!ok) return res.status(404).json({ error: "Book not found" });
  res.status(204).send();
});

export default router;
