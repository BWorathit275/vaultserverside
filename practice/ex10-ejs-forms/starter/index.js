const express = require("express");
const webRoutes = require("./routes/webRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
// TODO: parse HTML form bodies (hint: express.urlencoded)
app.use(express.static("public"));

app.use("/", webRoutes);

// TODO: 404 page for anything not matched

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
