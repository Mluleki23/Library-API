import express, { Application } from "express";
import authorRoutes from "./routes/authors";
import { logger } from "./middleware/logger";

const app: Application = express();
app.use(express.json());
app.use(logger);

// Routes
app.use("/authors", authorRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Library API" });
});

export default app;
