import express, { Application, Request, Response } from "express";
import authorRoutes from "./routes/authors";
import bookRoutes from "./routes/books";
import { logger } from "./middleware/logger";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

const app: Application = express();
app.use(express.json());
app.use(logger);

// Routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Library API" });
});

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
