 import { Request, Response, NextFunction } from "express";

 export interface ApiError extends Error {
   status?: number;
 }

 export const notFoundHandler = (
   req: Request,
   res: Response,
   _next: NextFunction
 ) => {
   res.status(404).json({ error: "Not Found" });
 };

 export const errorHandler = (
   err: ApiError,
   _req: Request,
   res: Response,
   _next: NextFunction
 ) => {
   const status = err.status && Number.isInteger(err.status) ? err.status : 500;
   const message = err.message || "Internal Server Error";
   res.status(status).json({ error: message });
 };
