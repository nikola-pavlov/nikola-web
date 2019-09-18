var mongoose = require("mongoose");
var Project	 = require("./models/project");
var Comment = require("./models/comment");

var data = [
{
	name: "Project1", 
	image: "https://pixabay.com/get/55e8d0464a54b108f5d084609620367d1c3ed9e04e50744f7d277bdc934fc0_340.jpg",
	description: "Incidunt nihil non velit fugit officia adipisci, nesciunt, id esse quo nisi labore quod officiis laborum nam doloremque quae ad ducimus quas.",
	date: "12/12/12",
	category: "Branding"
},
{
	name: "Project2", 
	image: "https://pixabay.com/get/54e9dd414855ac14f6da8c7dda793f7f1636dfe2564c704c732773d49f49c75d_340.jpg",
	description: "Beatae unde non alias in eum labore nihil voluptates, molestiae eligendi! Ratione laudantium adipisci nisi facere harum tenetur impedit aliquam, nam ut.",
	date: "15/01/89",
	category: "Book Cover"
},
{
	name: "Project3", 
	image: "https://pixabay.com/get/55e0d3434a5baf14f6da8c7dda793f7f1636dfe2564c704c732773d49f49c75d_340.jpg",
	description: "Autem natus tenetur, voluptatum nulla, illum illo quasi possimus sint odio? Cum voluptatem quasi, ad, iure repudiandae reiciendis officiis autem dolorem ullam.",
	date: "21/12/99",
	category: "Maps"
}
]

function seedDB(){
   //Remove all projects
   Project.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed projects!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few projects
            data.forEach(function(seed){
                Project.create(seed, function(err, project){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a project");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    project.comments.push(comment);
                                    project.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;