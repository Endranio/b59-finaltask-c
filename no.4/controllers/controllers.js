const {users,collections,task}=require("../../models")
const bcrypt = require("bcrypt")
const config = require("../../config/config.json")
const saltRound = 10




function renderRegister(req, res) {
    res.render("auth-register");
  }

async function authRegister(req,res){
  const {username,email,password}= req.body 
  
  const hashedPassword = await bcrypt.hash(password,saltRound)
  const newUser = await users.create({username,email,password:hashedPassword})

res.redirect("/login")
}

function renderLogin(req, res) {
    res.render("auth-login");
  }

  async function authlogin(req,res){
    const {email,password} = req.body
    console.log("ini login:",req.body)

    const user = await users.findOne({
      where:{email}
    })

    if(!user){
      return res.redirect("/login")
    }
    
    const isValidated = await bcrypt.compare(password,user.password)
    
    if(!isValidated){
      return res.redirect("/login")
    }

    let loggedInUser = user.toJSON()
    delete loggedInUser.password
    req.session.users=loggedInUser 

    res.redirect("/collections")
  }
  
function renderCollections(req,res){
    res.render('collections')
}

function renderTask(req,res){
    res.render("task")
}
function renderAddCollections(req,res){
    res.render("add-collections")
}
 
async function addCollections(req,res){
console.log("form submited")
const {name}=req.body
console.log("ini bidy:",req.body)

const result = await collections.create({
  name
})
console.log("test result:",result)


res.redirect("add-collections")
}

async function deleteCollections(req,res){
  const {id} = req.params
  const result =await collections.destroy({
    where:{id}
  })

  console.log("result deleted:",result)
}

module.exports = {renderRegister,renderLogin,renderTask,renderCollections,renderAddCollections,addCollections,authRegister,authlogin,deleteCollections}