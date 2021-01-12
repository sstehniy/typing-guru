import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";
import { connectToDb } from "./utils/connectToDb";
import { errorHandler } from "./utils/errorHandler";
import dotenv from "dotenv";
dotenv.config();

import registerRouter from "./controllers/register";
import loginRouter from "./controllers/login";
import testsRouter from "./controllers/tests";
import wordsRouter from "./controllers/words";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//eslint-disable-next-line
morganBody(app, {
  dateTimeFormat: "clf",
  logReqUserAgent: false,
  theme: "lightened",
});

// Controllers
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/tests", testsRouter);
app.use("/api/words", wordsRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.use(errorHandler);

void connectToDb();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
