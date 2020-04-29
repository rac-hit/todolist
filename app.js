const express= require("express");
const bodyParser= require("body-parser");
const date= require(__dirname + "/date.js");

const app= express();
var todos= [];
var workItems=[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  var day= date.getDate();
  res.render("list", {listTitle: day, addItem: todos});
});

app.post("/", function(req, res){
  var todo= req.body.todo;
    if(req.body.submit == "Work")
    {
      workItems.push(todo);
      res.redirect("/work");
    }
    else {
      todos.push(todo);
      res.redirect("/");
    }
})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", addItem: workItems})
})

app.post("/work", function(req, res){
  var work= req.body.todo;
  workItems.push(work);
  res.redirect("/work");
})


app.listen(3000, function(){
  console.log("Server started on port 3000");
})
