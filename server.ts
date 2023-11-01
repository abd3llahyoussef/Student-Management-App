import express from "express";
import cors from "cors";
import { Final } from "./Routes/mongodbRoute";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost:27017/Students");

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// type corses = {
//   origin: String;
//   optionsSuccessStatus: Number;
// };
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

const server: String = "0.0.0.0:7070";
app.listen(7070, () => {
  console.log(`the server is running now on port:${server}`);
});

Final(app);

export default app;
