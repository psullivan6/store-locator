# Store Locator
Based off Google Maps' Store Locator [code](https://github.com/googlemaps/js-store-locator)

## General Notes

* Use the [`searchPosition` method](https://googlemaps.github.io/js-store-locator/reference.html#storeLocator.Panel) of the `Panel` class to search via an input that's not part of the default list Panel view
* Google Maps API Key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* The Google Maps API script tag has a callback function that is the wrapper for all the store locator code, so make sure they're the same name
* Script call order matters b/c the `store-locator.min.js` script needs the Maps API script and the Maps API script needs the callback function code, thus the order has to be:
    - callback script with store locator code
    - Maps API
    - store locator plugin


## Dependencies

Forked version of `js-store-locator` installed via bower and the latest commit
hash:    
`bower install 'git://github.com/struck/js-store-locator.git#LATEST_HASH' --save`


## Playground Repo Notes:

[Download Latest Release](https://github.com/psullivan6/playground/releases/latest)

## Scratch Build Instructions

### Pre-Build Setup
1. `.gitignore` with all npm and misc. ignores
1. `.jshintrc` from [My Gist](https://gist.github.com/psullivan6/e7d9f6611bd163e52951)
1. commit

### Scratch Build Components
1. Run $`npm init`
1. Install task-runner and task libs: $`npm install gulp gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-minify-css gulp-concat del run-sequence --save`
    - `gulp`              - the task-runner
    - `gulp-sass`         - compile the sass
    - `gulp-autoprefixer` - autoprefix the sass
    - `gulp-sourcemaps`   - sourcemap the sass
    - `gulp-concat`       - concatenate the compiled sass into 1 css file
    - `gulp-cssnano`      - minify the resulting css file
    - `del`               - cleanup the source files for testing
1. Install dev dependencies: $`npm install cache-require-paths gulp-util require-dir --save-dev`
    - `cache-require-paths`
    - `gulp-util`
    - `require-dir`

# TO-DO

- geolocation denied callback / loader
- style the left panel
- style the map
