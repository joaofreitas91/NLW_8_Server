import express from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json()); // Isso é chamado de middleware
app.use(routes);
app.listen(3333, () => console.log("Server ON"));
