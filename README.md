# gulpfile
A gulp file to streamline development. The default command ('gulp') starts the php server and watches the scss and php for changes. On change, it compiles the scss to css and refreshes the browser window.
Update all paths with the correct path to your files.

## Getting started
Download or clone the repo to your local machine.

### Prerequisites
I use YARN to manage my dependancies but use which ever package manager you prefer to install the dependancies below.
You will need:
Gulp + gulp-minify, gulp-sass, gulp-connect-php, browser-sync, gulp-clean-css, gulp-sourcemaps, gulp-rename, gulp-plumber.

To install with YARN use the following

```
yarn add -D gulp gulp-minify gulp-sass gulp-connect-php browser-sync gulp-clean-css gulp-sourcemaps gulp-rename gulp-plumber
```

## Install and run
Copy the gulpfile.js to the root of your project
Run 

```
gulp
```

to start the php server and browser-sync + watch scss and php for changes then compile.

Run

```
gulp build
```

to build all files to the dist folder ready for production.

