# gulp-svg-to-json-to-scss

> Using this plugin, you'll be able to compress SVGs into a JSON  file and as base64 encoded variables in a SCSS file.


[based on https://github.com/gurmukhp/gulp-svg-json-spritesheet.git](https://github.com/gurmukhp/gulp-svg-json-spritesheet.git)

## Install

```
$ npm install gulp-svg-to-json-to-scss --save-dev 
```


## Usage

```js
var gulp = require('gulp');
var gulpsvgtojsontoscss = require('gulp-svg-to-json-to-scss');

gulp.task('default', function() {
  return gulp.src('./images/foo/**/*.svg')
      .pipe(gulpsvgtojsontoscss({
      jsonFile: 'images.json',
      scssFile: '_images.scss',
      basePath:"./images",
      noExt:true,
      delim:"_"
      }))
      .pipe(gulp.dest('./'));
});
```

### Sample Output

images/foo/svg/fireplace_00000.svg
images/foo/svg2/fireplace_00001.svg

will result in 

images.json
```json
{
  "foo_svg_fireplace_00000": {
    "data": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"269\" height=\"393\" viewBox=\"0 0 269 393\">...</g></svg>",
    "info": {
      "width": "269",
      "height": "393"
    }
  },
  "foo_svg2_fireplace_00001": {
    "data": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"269\" height=\"393\" viewBox=\"0 0 269 393\">...</g></svg>",
    "info": {
      "width": "269",
      "height": "393"
    }
  }
}
```

_images.scss
```scss
$foo_svg_fireplace_00000: 'data:image/svg+xml;base64,PHN2ZyB4bWxuc.....NMjEuNSAyMS41aDEyMHYxMjBoLTEyMHoiLz48L3N2Zz4=';
$foo_svg2_fireplace_00001: 'data:image/svg+xml;base64,PHN2ZyB4bWxuc....mciIHdpZHRoRlci1ldmVudHM9Im5vbmUiLz48L3N2Zz4=';
```

## API

### gulp-svg-to-json-to-sass(file,[options])

#### options.jsonFile
Type: `string`

Default: ``

sets the name of JSON file

#### options.scssFile
Type: `string`

Default: ``

sets the name of SCSS file


#### options.basepath
Type: `string`

Default: ``

sets the part of the relative Path to be removed from the object key  
images/svg with "images" will result in svg

#### options.delim
Type: `string`

Default: `_`

sets the path delimiter

#### options.noExt
Type: `bolean`

Default: `false`

should the .svg extension be removed from rom the object key
## License

MIT © flomair
