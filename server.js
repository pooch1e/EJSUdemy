import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

//set up parse for form submissions
app.use(bodyParser.urlencoded({ extended: true }));


//array to store blog posts
const blogPosts = [];


//set up gets

//get index
app.get("/", function(req, res) {
  res.render("pages/index", { blogPosts });
});

//about page
app.get("/about", function(req, res) {
  res.render('pages/about');
});

// Route to handle new post submissions
app.post("/add-post", (req, res) => {
  const { title, content } = req.body;
  blogPosts.push({ title, content });
  res.redirect('/');
});

//route to handle post Updates GET
app.get("/pages/edit/:index", (req, res) => {
  const postIndex = req.params.index;
  const post = blogPosts[postIndex];
  
  if (post) {
    res.render("pages/edit", { post, index: postIndex });
  } else {
    res.redirect("/");
  }
});

// //route to handle Update POST
app.post("/update-post/:index", (req, res) => {
  const postIndex = req.params.index;
  const { title, content } = req.body;
  
  if (blogPosts[postIndex]) {
    blogPosts[postIndex] = { title, content }; // Update the post with new data
  }
  res.redirect("/");
});

//route to handle REMOVE GET
app.post("/delete-post", (req, res) => {
  //finds hidden index of post and saves to post index
  const postIndex = req.body.index;
  //need to remove this index from array
    // Convert postIndex to a number and validate it
  if (postIndex >= 0 && postIndex < blogPosts.length) {
    blogPosts.splice(postIndex, 1);
  }

  //go back to main page
  res.redirect("/");

})




// Function to start the server
const startServer = () => {
    console.log("The server is starting...")
  app.listen(port, () => {
    console.log("running on 3000");
  });
};
startServer();
export { app, startServer };