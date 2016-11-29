var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task("scripts", ['clean'], () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('copyConfigFiles', ['clean'], function () {
    gulp.src('./src/**/*.json')
        .pipe(gulp.dest("dist"));
});

gulp.task("tslint", () =>
    gulp.src("./src/**.ts")
        .pipe(tslint({
            configuration: "tslint.json"
        }))
        .pipe(tslint.report())
);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts', 'copyConfigFiles', 'tslint']);