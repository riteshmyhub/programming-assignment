import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import createHttpError from "http-errors";
import router from "./api/api.routes.js";
import express from "express";
import "./database/database.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
   cors({
      origin: ["http://localhost:4200"],
      credentials: true,
   })
);
app.use(express.json());
app.use("/api/v1", router);
const client = path.join(__dirname, "..", "..", "client", "dist");
if (fs.existsSync(client + "/index.html")) {
   app.use(express.static(client));
   app.use("*", (req, res) => {
      res.sendFile(client + "/index.html");
   });
}
app.use(async (req, res, next) => {
   next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.send({ error: { status: err.status || 500, message: err.message } });
});
// server
app.listen(PORT, () => {
   console.log(`server running on : http://localhost:${PORT}/api/v1`);
});
