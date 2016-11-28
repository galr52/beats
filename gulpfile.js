var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");

// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist"));
// });

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task("scripts",['clean'],  () =>{
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});



// or requiring in ES5

gulp.task("tslint", () =>
    gulp.src("input.ts")
        .pipe(tslint({
            configuration: "tslint.json"
        }))
        .pipe(tslint.report())
);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'tslint']);