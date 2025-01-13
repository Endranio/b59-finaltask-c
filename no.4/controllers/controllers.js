const { User, Collection, Task } = require("../../models"); // Gunakan nama model dengan huruf kapital
const bcrypt = require("bcrypt");
const config = require("../../config/config.json");
const saltRound = 10;

function renderRegister(req, res) {
  res.render("auth-register");
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRound);
  const newUser = await User.create({ username, email, password: hashedPassword });

  res.redirect("/login");
}

function renderLogin(req, res) {
  res.render("auth-login");
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  console.log("ini login:", req.body);

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.redirect("/login");
  }

  const isValidated = await bcrypt.compare(password, user.password);

  if (!isValidated) {
    return res.redirect("/login");
  }

  let loggedInUser = user.toJSON();
  delete loggedInUser.password;
  req.session.user = loggedInUser; // Perbaiki `users` menjadi `user`

  res.redirect("/collections");
}

async function renderCollections(req, res) {
  const { user } = req.session;

  
  const collections = await Collection.findAll({
    include: {
      model: User,
      as: "user", 
    },
  });

  res.render("collections",{user,collections});
}

function renderTask(req, res) {
  res.render("task");
}

function renderAddCollections(req, res) {
  res.render("add-collections");
}

async function addCollections(req, res) {
  console.log("form submitted");
  const { name } = req.body;
  console.log("ini body:", req.body);

  const result = await Collection.create({
    name,
  });
  console.log("test result:", result);

  res.redirect("/collections"); // Pastikan rute diarahkan dengan benar
}

async function deleteCollections(req, res) {
  const { id } = req.params;
  const result = await Collection.destroy({
    where: { id },
  });

  console.log("result deleted:", result);
  res.redirect("/collections"); // Pastikan setelah hapus mengarah kembali ke halaman collections
}

module.exports = {
  renderRegister,
  renderLogin,
  renderTask,
  renderCollections,
  renderAddCollections,
  addCollections,
  authRegister,
  authLogin, 
  deleteCollections,
};
