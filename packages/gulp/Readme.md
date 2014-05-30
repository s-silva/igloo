# Gulp for Igloo

This package includes following Gulp plugins:

* gulp-notify - notifies when a task is done.
* gulp-livereload - browser reload on changes.
  install browser extension to get this feature working
* gulp-less - less compiler.
* gulp-concat - concatenates files.
* gulp-uglify - the name says it.
* gulp-autoprefixer - browser prefixes for stylesheets.
* gulp-minify-css - name says it.
* gulp-imagemin - image compression.

Install Gulp globally with:

```bash
$ npm i gulp -g
```

Then you can start Gulp using:

```bash
$ gulp
```

Or keep Gulp process running and compile/reload browser
when files are saved, use:

```bash
$ gulp watch
```

Finally, don't forget to link scripts and images in
'/assets/public/build' directory to the app.

Note: CSS files generated using LESS will be linked
automatically.