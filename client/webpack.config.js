var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};

    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.debug = !isProd || !isTest;

    config.entry = isTest ? {} : {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app/main.ts'
    };

    config.output = isTest ? {} : {
        path: root('dist'),
        publicPath: isProd ? '/' : 'http://localhost:3000/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    config.resolve = {
        cache: !isTest,
        root: root(),
        // only discover files that have those extensions
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app': 'src/app',
            'common': 'src/common'
        }
    };

    config.module = {
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader'],
                exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=fonts/[name].[hash].[ext]?'},

            {test: /\.json$/, loader: 'json'},

            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            {test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss'},
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
            },
            {test: /\.html$/, loader: 'raw'}
        ],
        postLoaders: [],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    };

    if (isTest) {
        config.module.postLoaders.push({
            test: /\.ts$/,
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });

        config.ts = {
            compilerOptions: {
                sourceMap: false,
                sourceRoot: './src',
                inlineSourceMap: true
            }
        };
    }

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        })
    ];

    if (!isTest) {
        config.plugins.push(
            new CommonsChunkPlugin({
                name: ['vendor', 'polyfills']
            }),

            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunksSortMode: 'dependency'
            }),

            new ExtractTextPlugin('css/[name].[hash].css', {disable: !isProd})
        );
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: root('src/public')
            }])
        );
    }

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.devServer = {
        contentBase: './src/public',
        historyApiFallback: true,
        stats: 'minimal'
    };

    return config;
}();

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}