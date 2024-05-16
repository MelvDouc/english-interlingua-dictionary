import { type Response } from "express";

export default function pageNotFound(res: Response) {
  res.render("404.njk");
}