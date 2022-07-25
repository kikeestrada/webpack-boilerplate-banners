const path = require('path');
var autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);
const projectVars = require(__dirname + '/config.js');
const username = require('username');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
    filename: 'style.css',
});

const fs = require('fs');
const directoryPath = path.join(__dirname, 'src/assets/images/frames');

var frameImages = [];

fs.readdirSync(directoryPath)
    .filter((files) => !/(^|\/)\.[^\/\.]/g.test(files))
    .forEach(function (file) {
        var image = {
            filename: path.basename(file).replace(/\.[^/.]+$/, ''),
            extension: path.extname(file),
        };

        frameImages.push(image);
    });

projectVars.frameImages = frameImages;

const config = {
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dev-server'),
    },

    devServer: {
        contentBase: path.join(__dirname + '/dev-server'),
        stats: 'errors-only',
        port: Math.floor(Math.random() * (4000 - 2000)) + 2000,
        open: true,
        overlay: true,
        watchContentBase: true,
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 2 } },
                        {
                            loader: 'postcss-loader',
                            options: { plugins: () => [autoprefixer] },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                functions: {
                                    'get($keys)': function (keys) {
                                        keys = keys.getValue().split('.');
                                        let result = projectVars;
                                        let i;
                                        for (i = 0; i < keys.length; i++) {
                                            result = result[keys[i]];
                                        }
                                        result = sassUtils.castToSass(result);
                                        return result;
                                    },
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } },
                    ],
                },
            }),
        ],
    },
    plugins: [
        extractPlugin,

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            inject: false,
            minify: {
                collapseWhitespace: true,
            },
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                'banner-scripts.js': [
                    'src/assets/js/isi.js',
                    'src/assets/js/main.js',
                    'src/assets/js/loader.js',
                ],
            },
            transform: {
                'banner-scripts.js': (code) =>
                    require('uglify-js').minify(code).code,
            },
        }),
        new ZipPlugin({
            path: (function () {
                var path = '';

                if (projectVars['project']['id'] === '') {
                    path =
                        '/Users/' +
                        username.sync() +
                        '/Desktop/tmp/banner-deliveries/' +
                        projectVars['project']['client'] +
                        '/' +
                        projectVars['project']['campaign'];
                } else {
                    path =
                        '/Users/' +
                        username.sync() +
                        '/Desktop/tmp/banner-deliveries/' +
                        projectVars['project']['client'] +
                        '/' +
                        projectVars['project']['campaign'] +
                        '/' +
                        projectVars['project']['id'];
                }

                return path;
            })(),

            filename: (function () {
                var name =
                    projectVars['bannerDimensions']['width'] +
                    'x' +
                    projectVars['bannerDimensions']['height'] +
                    '.zip';

                return name;
            })(),
            exclude: 'main.js',
        }),
    ],
};

module.exports = config;
