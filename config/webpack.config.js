var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var settings            = require('./settings.js');


module.exports = function(release){

  var autoprefix = '{browsers:["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
  var jsLoaders = ['babel-loader?experimental&optional=selfContained'];
  var cssLoaders = ['css-loader', 'autoprefixer-loader?' + autoprefix];

  var scssLoaders = cssLoaders.slice(0);
    scssLoaders.push('sass-loader?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules/bootstrap-sass')));

  var lessLoaders = cssLoaders.slice(0);
      lessLoaders.push('less-loader');

  var entries;

  if(release){
    entries = settings.scripts.paths.entries;
  } else {
    jsLoaders.unshift('react-hot');

    // Configure entries with hotloader
    var originalEntries = settings.scripts.paths.entries;
    entries = {};
    for(var name in originalEntries){
      entries[name] = ['webpack-dev-server/client?http://localhost:' + settings.ports.hotPort, 'webpack/hot/only-dev-server', originalEntries[name]];
    }
  }

  var cssEntries = settings.styles.paths.entries;
  for(var name in cssEntries){
    entries[name] = cssEntries[name];
  }

  return {
    output: {
      path: release ? settings.prodOutput : settings.devOutput,
      filename: '[name].js',
      publicPath: release ? settings.scripts.paths.relativeOutput.prod : 'http://localhost:' + settings.ports.hotPort + settings.devRelativeOutput,
      sourceMapFilename: "debugging/[file].map",
      pathinfo: !release // http://webpack.github.io/docs/configuration.html#output-pathinfo
    },
    resolve: {
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: ["web_modules", "node_modules", "bower_components", "vendor"]
    },
    cache: true,
    //debug: !release,                          // http://webpack.github.io/docs/configuration.html#debug
    devtool: release ? false : "eval",          // http://webpack.github.io/docs/configuration.html#devtool
    entry: entries,
    stats: {
      colors: true,
      reasons: !release
    },
    plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin("[name].css"),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      )
    ] : [
      new ExtractTextPlugin("[name].css"),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
      //new webpack.optimize.CommonsChunkPlugin('init.js') // Use to extract common code from multiple entry points into a single init.js
    ],
    module: {
      preLoaders: [
        { test: /\.js$/,              loader: 'jshint', exclude: /node_modules/ }
      ],
      loaders: [
        { test: /\.js$/,              loaders: jsLoaders, exclude: /node_modules/ },
        { test: /\.jsx?$/,            loaders: jsLoaders, exclude: /node_modules/ },
        { test: /\.scss$/,            loader: ExtractTextPlugin.extract('style-loader', scssLoaders.join('!')) },
        { test: /\.css$/ ,            loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!')) },
        { test: /\.less$/ ,           loader: ExtractTextPlugin.extract('style-loader', lessLoaders.join('!')) },
        { test: /\.html$/,            loader: 'webpack-compile-templates' },
        { test: /.*\.(gif|png|jpg|jpeg|svg)$/, loaders: ['file?hash=sha512&digest=hex&size=16&name=[hash].[ext]', 'image-webpack-loader?optimizationLevel=7&interlaced=false']},
        { test: /.*\.(eot|woff2|woff|ttf)/,    loader: 'file?hash=sha512&digest=hex&size=16&name=cd [hash].[ext]'}
      ]
    }
  };
};
