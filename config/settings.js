var info = require('../package.json');
var path = require('path');

var clientAppPath = path.join(__dirname, '../client/');
var devRelativeOutput     = '/build/';
var prodRelativeOutput    = '/public/';
var devOutput     = path.join(__dirname, '..' + devRelativeOutput);
var prodOutput    = path.join(__dirname, '..' + prodRelativeOutput);

module.exports = {
  title: info.title,
  author: info.author,
  version: info.versions,
  build: Date.now(),

  devRelativeOutput: devRelativeOutput,
  prodRelativeOutput: prodRelativeOutput,

  devOutput: devOutput,
  prodOutput: prodOutput,

  // This setting affects the 'build' in gulpfile.js
  // If projectType is 'client' then pages from client/html will be used
  // If projectType is 'client-server' page from client/html will be ignored in the build
  // and node will serve pages from app/views instead
  projectType: 'client-server',

  // Used by pageSpeed. This should be the url of your production server
  applicationUrl: 'http://www.example.com',

  ports: {
    server: 8888,
    reloadProxy: 5000,
    hotPort: 8080,
    livereload: 35729
  },
  appFiles: [
    './server.js',
    './app/**/*'
  ],
  clientFiles: [
    './client/js/**/*',
    './__tests__/**/*'
  ],
  assets: {
    paths: {
      all: clientAppPath + 'assets/**/*',
      output: {
        dev: devOutput,
        prod: prodOutput
      }
    }
  },
  fonts: {
    paths: {
      all: [
        clientAppPath + 'fonts/**'
        // './node_modules/bootstrap-sass/assets/fonts/**',
        // './node_modules/font-awesome/fonts/**'
      ],
      output: {
        dev: devOutput + 'fonts',
        prod: prodOutput + 'fonts'
      }
    }
  },
  scripts: {
    paths: {
      all: clientAppPath + 'js/**/*.js',
      entries: {
        app: clientAppPath + 'js/app.js',
        styles: clientAppPath + 'styles/styles.js'
      },
      output: {
        dev: devOutput + 'js',
        prod: prodOutput + 'js'
      },
      relativeOutput: {
        dev: devRelativeOutput + 'js',
        prod: prodRelativeOutput + 'js'
      }
    }
  },
  styles: {
    autoPrefix: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
    paths: {
      all: clientAppPath + 'styles/**/*.scss',

      output: {
        dev: devOutput + 'css/',
        prod: prodOutput + 'css/'
      }
    },
    sourcemaps: false
  },
  html: {
    paths: {
      all: clientAppPath + 'html/**/*.html',
      ignore: clientAppPath + '!html/**/_*.html',
      output: {
        dev: devOutput,
        prod: prodOutput
      }
    }
  },
  images: {
    paths: {
      all: [clientAppPath + 'images/*', clientAppPath + 'images/**/*.jpg', clientAppPath + 'images/**/*.jpeg', clientAppPath + 'images/**/*.gif'],
      output: {
        dev: devOutput + 'images/',
        prod: prodOutput + 'images/'
      }
    },
    compression: 3
  }
};
