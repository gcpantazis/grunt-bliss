grunt-bliss [![Build Status](https://travis-ci.org/gcpantazis/grunt-bliss.png?branch=master)](https://travis-ci.org/gcpantazis/grunt-bliss)
================================

> Compile Bliss templates.

Getting Started
--------------------------------------

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

      npm install grunt-bliss --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

      grunt.loadNpmTasks('grunt-bliss');

Bliss task
--------------------------------------

*Run this task with the `grunt bliss` command.*

Configuration
--------------------------------------

      bliss: {
        compile: {
          files: {
            'tmp/bliss.html': ['test/fixtures/bliss.js.html']
          },
          options: {
            data: {
              test: true,
              year: '<%= grunt.template.today("yyyy") %>'
            }
          }
        }
      },

Related template (bliss.js.html):

      @!(data)

      @{
        products = [{
          name: "foo",
          price: 123
        },{
          name: "bar",
          price: 123
        }]
      }

      <ul>
        <div>
          @data.year
        </div>
        @for(var p=0; p<products.length; p++) {
          @{ product = products[p] }
          <li>@product.name: ($@product.price)</li>
        }
      </ul>
