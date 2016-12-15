'use strict';
var gutil = require('gulp-util');
var File = gutil.File;
var through = require('through2');
var SVGO = require('svgo');
var path = require("path")
var _ = require('lodash');
var btoa = require('base-64').encode;


/**
 * File must be a buffer and not a string.
 * @param {Object} opts options
 */
module.exports = function (opts) {

    opts = opts || {};
    var spritesheet = {};
    var svgCompressor = new SVGO();

    function compressEachFile(file, enc, cb) {
        if (file.isNull()) {
            callback(null, file);
            return;
        }

        if (file.isStream()) {
            callback(new gutil.PluginError(
                'gulp-svg-json-spritesheet', 'Streaming not supported'));
            return;
        }

        try {
            svgCompressor.optimize(file.contents.toString(), function (result) {
                var filePath = file.path;
                var fileName;
                if (opts.basePath) {
                    fileName = path.relative(opts.basePath, filePath);
                    if (opts.delim) {
                        fileName = fileName.replace(path.sep, opts.delim);
                    } else {
                        fileName = fileName.replace(path.sep, "_");
                    }
                } else {
                    fileName = filePath.substring(filePath.lastIndexOf(path.sep) + 1);
                }
                if (opts.noExt) {
                    fileName = fileName.replace(".svg", "")
                }
                spritesheet[fileName] = result;
            });
        } catch (error) {
            this.emit('error', new gutil.PluginError('gulp-svg-json-spritesheet', error));
        }
        cb();
    }
    /**
     * Once all files have been compressed, return compressed JSON file.
     * @param {object} callback
     */
    function jsonToSass(data) {
        var scss = '';

        if (!data) {
            return;
        }

        _.mapKeys(data, function (value, key) {
            var newval = "'data:image/svg+xml;base64," + btoa(value.data)+ "'";
            scss += '$' + key + ': ' + newval + ';\r\n'
        });
        return scss;
    };

    /**
     * Once all files have been compressed, return compressed JSON file an SASS file .
     * @param {Function} callback
     */
    function convertToFiles(callback) {
        if (opts.jsonFile) {
            var output = new File({
                contents: new Buffer(JSON.stringify(spritesheet, null, '\t')),
                path: opts.jsonFile,
            });
            this.push(output);
        }
        if (opts.scssFile) {
            var output = new File({
                path: opts.scssFile,
                contents: new Buffer(jsonToSass(spritesheet))
            });
            this.push(output);
        }
        callback();
    }

    return through.obj(compressEachFile, convertToFiles);
};
