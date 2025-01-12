const express = require('express')
const path = require("path");
const hbs = require("hbs"); 
const app = express()
const port = 3000
const {renderRegister, renderLogin, renderCollections, renderTask, renderAddCollections, addCollections}= require("./no.4/controllers/controllers")

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./no.4/views"));

app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "/assets")));


hbs.registerPartials(__dirname + "/no.4/views/partials", function (err) {});


app.get("/", renderRegister)
app.get("/login",renderLogin)
app.get("/collections",renderCollections)
app.get("/task",renderTask)
app.get("/add-collections",renderAddCollections)

app.post("/add-collections",addCollections)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})