const gulp = require("gulp"),
  minify = require("gulp-minify"),
  sass = require("gulp-sass"),
  connect = require("gulp-connect-php"),
  browserSync = require("browser-sync"),
  cleanCSS = require("gulp-clean-css"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber");

gulp.task("browser-reload", function() {
  return browserSync.reload();
});

gulp.task("build-images", function() {
  return gulp
    .src("img/**/*.*")
    .pipe(gulp.dest("dist/img"));
});

gulp.task("build-css-gifs", function() {
  return gulp
    .src("css/*.gif")
    .pipe(gulp.dest("dist/css"));
});


gulp.task("build-js", function() {
  return gulp
    .src("js/*.js")
    .pipe(plumber())
    .pipe(
      minify({
        ext: {
          src: "-debug.js",
          min: ".min.js"
        },
        ignoreFiles: ["*.min.js"],
        noSource: true
      })
    )
    .pipe(gulp.dest("dist/js"));
});

gulp.task("sass", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});

gulp.task("build-sass", function() {
  return gulp
    .src("scss/style.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("build-fonts", function() {
  return gulp
    .src("fonts/*.*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("build-fonts-css", function() {
  return gulp
    .src("fonts/*.*")
    .pipe(gulp.dest("dist/css/fonts"));
});

gulp.task('run-connect-php', function() {
    connect.server({ 
      port: 8010, 
      keepalive: true});
});

gulp.task('browser-sync',['run-connect-php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8010,
        open: true,
        notify: false
    });

  gulp.watch("**/*.php").on("change", function() {
    browserSync.reload();
  });
});

gulp.task("watch-sass", function() {
  gulp.watch("scss/**/*.scss", ["sass"]);
  gulp.watch("css/style.css", ["browser-reload"]);
});

gulp.task("watch", ["browser-sync", "watch-sass"]);

gulp.task("default", ["watch"]);

gulp.task("build", ["build-sass", "build-js", "build-images", "build-fonts", "build-fonts-css", "build-css-gifs"]);
