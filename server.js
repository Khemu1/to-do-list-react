import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import { connectDB } from "./app/databases/db.js";
import router from "./app/routes/router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
connectDB();
app.use(express.static(path.join(__dirname, "client-build")));
app.use(morgan("dev"));
app.use("", router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
