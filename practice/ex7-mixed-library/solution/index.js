const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const webRoutes = require("./routes/webRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api", bookRoutes);
app.use("/", webRoutes);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
