# stylus-vrhr

Minimalist vertical rhythm and horizontal rhythm plugin for stylus.

I've been using these helpers on all my stylus projects for years.  It makes your pages look harmonious and consistent.

Looks like this:

```stylus
$vertical-rhythm = 20px;
$horizontal-rhythm = 80px;

button
  height: vr(2) // 40px
  min-width: hr(9/12) // 60px

p
  font-size: 33px
  line-height: vr(@font-size) // 40px
  margin-bottom: vr(2/12) // 3.5px
```

The `vr()` and `hr()` helpers take a plain number and multiply it by the rhythm value. That's it.

However, if you pass the helpers a `px` unit value, the output will be that value rounded up to the nearest rhythm.

Also, all output will be rounded to the nearest half pixel.


# Installation

    npm install stylus-vrhr

## JS API example:

```javascript
var stylus = require('stylus');
var vrhr = require('stylus-vrhr');

stylus.use(vrhr());
stylus.render(...);
```

## Gulp example:

```javascript
var vrhr = require('stylus-vrhr');

gulp.task('styles', function () {
    gulp.src('./index.styl')
        .pipe(stylus({
            use: [vrhr()]
        }))
        .pipe(gulp.dest('./index.css'));
});
```
