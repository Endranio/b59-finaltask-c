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
      as: "User", 
      attributes: { exclude: ["password"]}
    },
  });
console.log("Collection render:", collections);
  res.render("collections",{user,collections});
}

async function renderTask(req, res) {

  let { user } = req.session;
  const { id } = req.params;

  const task = await Task.findAll({
    include: {
      model: Collection,
      as: "Collection",
      
    },
  });

  console.log("Collection with tasks:", task);
  res.render("task",{task, user,});
}

function renderAddCollections(req, res) {
  res.render("add-collections");
}

async function addCollections(req, res) {
  console.log("form submitted");
  let{user} = req.session
  const { name } = req.body;
  console.log("ini body:", req.body);

  const result = await Collection.create({
    name,
    user_id:user.id
  });


  console.log("test result collections:", result); 

  res.redirect("/collections");
}


async function addTask(req, res) {
  console.log("form submitted");
  let{user} = req.session
  const {id} = req.params
  const { name } = req.body;
  console.log("ini body:", req.body);

  const tasks = await Task.create({
    name,
    collection_id:id
  });

  console.log("test result:", tasks,user); 

  res.redirect("/task");
}

async function deleteCollections(req, res) {
  const { id } = req.params;
  // const {user} =req.session
  const result = await Collection.destroy({
    where: { id
     },
  });
  console.log("result deleted:", result);

  res.redirect("/collections"); 
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
  addTask
}
