const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "@aayusehgal",
    content: "Give me some sunshine.",
  },
  {
    id: uuidv4(),
    username: "@sunny",
    content: "God help those who help themselves..",
  },
  {
    id: uuidv4(),
    username: "@parth",
    content: "I am starting preparing for CLAT",
  },
];


app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });   
});

app.get("/posts/new", (req,res)=>{
  res.render("new.ejs");
})

app.post("/posts", (req,res)=>{
  let { username , content} = req.body;
  let id = uuidv4();
  posts.push({id,username,content});
  res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res)=>{
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p)=> id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts")
})

app.get("/posts/:id/edit", (req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("edit.ejs");
})

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect("/posts");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
