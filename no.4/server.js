const express = require("express");
require("dotenv").config()
var methodOverride = require('method-override')
var session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 3000;
const {
  renderRegister,
  renderLogin,
  renderCollections,
  renderTask,
  renderAddCollections,
  addCollections,
  authRegister,
  deleteCollections,
  authLogin,
  addTask,
  authLogout,
} = require("./controllers/controllers");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

app.get("/", renderRegister);
app.get("/login", renderLogin);
app.get("/collections", renderCollections);
app.get("/task/:id", renderTask);
app.get("/add-collections", renderAddCollections);
app.get("/logout",authLogout)

app.post("/register", authRegister);
app.post("/add-collections", addCollections);
app.post("/login", authLogin);
app.post("/task",addTask)
app.delete("/collections-delete/:id",deleteCollections)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
