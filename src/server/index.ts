import { join } from "node:path";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import router from "$server/core/router.js";

const root = process.cwd();
const port = Number(process.env.PORT ?? 8080);
const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", router);

ViteExpress.config({
  viteConfigFile: join(root, "vite.config.js")
});
ViteExpress.listen(app, port, () => {
  const message = isProduction
    ? `App running on port ${chalk.blue(port)}...`
    : `App running on ${chalk.blue("http://localhost:" + port)}...`;
  console.log(message);
});