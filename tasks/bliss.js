/*
 * grunt-bliss
 *
 * Copyright (c) 2013 George Pantazis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._,
    Bliss = require('bliss'),
    html = require('html');

  // content conversion for templates
  var defaultProcessContent = function(content) {
    return content;
  };

  // filename conversion for templates
  var defaultProcessName = function(name) {
    return name.replace('.js.html', '');
  };

  grunt.registerMultiTask('bliss', 'Compile bliss templates.', function() {

    var taskOpts = grunt.config(['bliss', 'options']) || {};

    var options = this.options({
      separator: grunt.util.linefeed + grunt.util.linefeed
    });

    options = grunt.util._.merge(taskOpts, options);

    var context = options.context;
    delete options.context;

    var nsInfo;

    // assign transformation functions
    var processContent = options.processContent || defaultProcessContent;
    var processName = options.processName || defaultProcessName;

    this.files.forEach(function(f) {
      var templates = [];

      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        var src = processContent(grunt.file.read(filepath));
        var compiled, filename;
        filename = processName(filepath);

        options = grunt.util._.extend(options, {
          filename: filepath
        });

        try {

          var bliss = new Bliss({
            context: context
          });

          compiled = bliss.render(filename);

        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Bliss failed to compile ' + filepath + '.');
        }

        templates.push(compiled);
      });

      var output = templates;
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {

        var finalOut = output.join(grunt.util.normalizelf(options.separator));

        finalOut = html.prettyPrint(finalOut, {
          'indent_size': 2
        });

        grunt.file.write(f.dest, finalOut);
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

  });

};