function renderRegister(req, res) {
    res.render("auth-register");
  }
function renderLogin(req, res) {
    res.render("auth-login");
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
 
function addCollections(req,res){

}

module.exports = {renderRegister,renderLogin,renderTask,renderCollections,renderAddCollections,addCollections}