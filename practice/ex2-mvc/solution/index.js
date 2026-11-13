const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const webRoutes = require("./routes/webRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");          // views/ is the default folder
app.use(express.json());
app.use(express.static("public"));      // serves public/css/style.css at /css/style.css

app.use("/api", bookRoutes);             // every API route gets the /api prefix
app.use("/", webRoutes);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
