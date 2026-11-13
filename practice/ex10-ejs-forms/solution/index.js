const express = require("express");
const webRoutes = require("./routes/webRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // HTML form bodies -> req.body
app.use(express.json());
app.use(express.static("public"));

app.use("/", webRoutes);

// Anything not matched above
app.use((req, res) => res.status(404).render("404", { title: "Not found" }));

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
