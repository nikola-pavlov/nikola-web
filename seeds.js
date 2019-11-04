var mongoose = require("mongoose");
var Project	 = require("./models/project");
var Comment = require("./models/comment");
var Photo = require("./models/photo");

var data = [
{
	name: "Project1", 
	image: "https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg",
	description: "Incidunt nihil non velit fugit officia adipisci, nesciunt, id esse quo nisi labore quod officiis laborum nam doloremque quae ad ducimus quas.",
	date: "12/12/12",
	category: "Branding"
},
{
	name: "Project2", 
	image: "https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg",
	description: "Beatae unde non alias in eum labore nihil voluptates, molestiae eligendi! Ratione laudantium adipisci nisi facere harum tenetur impedit aliquam, nam ut.",
	date: "15/01/89",
	category: "Book Cover"
},
{
	name: "Project3", 
	image: "https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg",
	description: "Autem natus tenetur, voluptatum nulla, illum illo quasi possimus sint odio? Cum voluptatem quasi, ad, iure repudiandae reiciendis officiis autem dolorem ullam.",
	date: "21/12/99",
	category: "Maps"
}
]

function seedDB(){
   //Remove all projects
   Photo.remove({}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("removed photos");
    }
   });
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
                                    console.log("Created new comment");
                                }
                            });

                        Photo.create(
                        {
                            photo: "https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg"
                        }, function(err, photo){
                            if(err) {
                                console.log(err);
                            } else {
                                project.photos.push(photo);
                                project.save();
                                console.log("Created new photo");
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