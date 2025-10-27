import { Request, Response, NextFunction } from "express";

export const validateAuthorCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, birthYear } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Author name is required" });
  }
  if (birthYear !== undefined && birthYear !== null) {
    if (typeof birthYear !== "number" || !Number.isInteger(birthYear)) {
      return res.status(400).json({ error: "birthYear must be an integer" });
    }
  }
  next();
};

export const validateAuthorUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, birthYear } = req.body ?? {};
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name must be a non-empty string" });
    }
  }
  if (birthYear !== undefined) {
    if (birthYear !== null && (typeof birthYear !== "number" || !Number.isInteger(birthYear))) {
      return res.status(400).json({ error: "birthYear must be an integer or null" });
    }
  }
  next();
};

export const validateBookCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, authorId, year } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Book title is required" });
  }
  if (authorId === undefined || typeof authorId !== "number" || !Number.isInteger(authorId)) {
    return res.status(400).json({ error: "authorId is required and must be an integer" });
  }
  if (year !== undefined && year !== null) {
    if (typeof year !== "number" || !Number.isInteger(year)) {
      return res.status(400).json({ error: "year must be an integer" });
    }
  }
  next();
};

export const validateBookUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, authorId, year } = req.body ?? {};
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "title must be a non-empty string" });
    }
  }
  if (authorId !== undefined) {
    if (authorId !== null && (typeof authorId !== "number" || !Number.isInteger(authorId))) {
      return res.status(400).json({ error: "authorId must be an integer" });
    }
  }
  if (year !== undefined) {
    if (year !== null && (typeof year !== "number" || !Number.isInteger(year))) {
      return res.status(400).json({ error: "year must be an integer or null" });
    }
  }
  next();
};
