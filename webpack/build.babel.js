import webpack from 'webpack';

import config, { statPath, distPath, rootPath } from './common.babel';
// common configuration parts (loaders, source references,
// app config and so on)

import CleanWebpackPlugin from 'clean-webpack-plugin';
// plugin to remove/clean build folder(s) before building
// https://github.com/johnagan/clean-webpack-plugin

import CopyWebpackPlugin from 'copy-webpack-plugin';
// A webpack plugin that copies individual files or
// entire directories to the build directory.

import CompressionPlugin from 'compression-webpack-plugin';
// Description: https://github.com/webpack-contrib/compression-webpack-plugin
// Potential gain: https://gist.github.com/Restuta/cda69e50a853aa64912d

//config.devtool = 'source-map';
config.output.filename = '[name].[hash].js';
config.output.chunkFilename = "async.[id].[hash].js";
config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        debug: false,
        sourceMap: true,
        output: {
          comments: false
        },
        compressor: {
          warnings: false
        }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new CopyWebpackPlugin([
        // Copy glob results (with dot files) to /absolute/path/
        { from: statPath, to: '' }
    ], {
        ignore: [
            '.*',
            '_*'
        ],
        // By default, we only copy modified files during
        // a watch or webpack-dev-server build. Setting this
        // to `true` copies all files.
        copyUnmodified: true
    }),
    new CleanWebpackPlugin([distPath], {
      root: rootPath, //  Useful when relative references are used in array
      verbose: true,
      dry: false,
    //  exclude: ['shared.js']
    })
    // new webpack.optimize.DedupePlugin(), // https://github.com/webpack/webpack/issues/1082
]);
config.module.rules = config.module.rules.concat([{
    test: /\.(sass|scss)/,
    loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}!sass-loader'
}]);

export default config;
