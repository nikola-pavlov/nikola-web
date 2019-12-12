var gulp = require("gulp"),
svgSprite = require("gulp-svg-sprite"),
rename = require("gulp-rename"),
del = require("del");

var config = {
	shape: {
		spacing: {
			padding: 20
		}
	},
	mode: {
		css: {
			sprite: "sprite.svg",
			render: {
				css: {
					template: "./gulp/templates/sprite.css"
				}
			}
		}
	}
}

gulp.task("beginClean", function(){
	return del(["./public/temp/sprite", "./public/assets/images/sprites"]);
});

gulp.task("createSprite", ["beginClean"], function(){
	return gulp.src("./public/assets/images/icons/**/*.svg")
		.pipe(svgSprite(config))
		.pipe(gulp.dest("./public/temp/sprite"));
});

gulp.task("copySpriteGraphic", ["createSprite"], function(){
	return gulp.src("./public/temp/sprite/css/**/*.svg")
		.pipe(gulp.dest("./public/assets/images/sprites"));
});

gulp.task("copySpriteCSS", ["createSprite"], function(){
	return gulp.src("./public/temp/sprite/css/*.css")
		.pipe(rename("_sprite.css"))
		.pipe(gulp.dest("./public/assets/styles/css/modules"));
});

gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function(){
	return del("./public/temp/sprite")
});

gulp.task("icons", ["beginClean", "createSprite", "copySpriteGraphic","copySpriteCSS", "endClean"]);