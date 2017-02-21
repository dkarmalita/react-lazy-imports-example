import webpack from 'webpack';

import * as pkg from '../package.json';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

const npmScript = process.env.npm_lifecycle_event;
console.log(npmScript)
// Takes NPM original script name in variable.
// Will be undefined while 'webpack' is run directly.

if(typeof(npmScript) == "undefined"){
// Take care about direct run of webpack if it is the case

    let scripts = Object.keys(pkg.scripts);
    console.log("Please don't run webpack directly, use one of the following npm scripts:");
    console.log(scripts.toString());
    console.log("Example: npm run",scripts[0]);
    process.exit(1);
}
const isBuild = npmScript.indexOf('build')!= -1;

export const rootPath    = path.resolve(__dirname, "../");     // Root of the project
export const srcPath     = path.join(rootPath, "src");         // Sources files
export const statPath    = path.join(rootPath, "static");      // Static files ro include in distribution
export const distPath    = path.join(rootPath, "dist");        // Target path for distribution to generate

export const htmlTempl = path.join(srcPath, "index.ejs");  // Template to generate the "index.html"
export const appMain   = path.join(srcPath, "index.jsx");    // Main application's file
export const pubPath   = '/';

const config = {
    entry: [
        appMain
    ],
    output: {
        filename: "[name].js",    // Output bundle naming rule
        path: distPath,           // Output path for the bundles
        publicPath: pubPath,      //
        chunkFilename: "async.[id].js",
    },
    module: {
        /*
        noParse: [
        // 'noParse' key allows us use "ready to go" parts (like
        // pre-minified libraries and etc.). These parts are including
        // in bundle without preprocessing.
        // http://stackoverflow.com/a/35018271

            // /\min.(js|css)$/,
            // leave out all of min.js and min.css files.
        ],
        */
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}'
            },

            {
                test: /\.gif$/,
                use: 'url-loader?limit=16000&mimetype=image/gif&name=[name].[ext]?[hash]'
            },
            {
                test: /\.jpg$/,
                use: 'url-loader?limit=100000&mimetype=image/jpg&name=[name].[ext]?[hash]'
            },
            {
                test: /\.png$/,
                use: 'url-loader?limit=50000&mimetype=image/png&name=[name].[ext]?[hash]'
            },

            {
                test: /\.svg/,
                use: 'url-loader?limit=50000&mimetype=image/svg+xml&name=[name].[ext]?[hash]!svgo'
            },

            // {
            //     test: /.*\.(gif|png|jpe?g|svg)$/i,
            //     loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack'],
            // },
            /*
            {
                test: /\.(woff|wff2)/,
                use: 'url-loader?limit=500000&name=[name].[ext]?[hash]' },

            {   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/vnd.ms-fontobject"
            },
            {   test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-otf"
            },
            {   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            */
            // {
            //     test: /\.jsx$/,
            //     use: 'react-hot!babel-loader', exclude: /(node_modules|public)/
            // },
            {
                test: /\.(js|jsx)/,
                use: ['babel-loader'],
                exclude: /(node_modules|public)/
            }
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: ['node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',     // target name
            favid: Date.now(),          // it is reffered in template and forced favicon get updated
            pkg     : pkg,
            template: htmlTempl,
            publicPath: pubPath,
            inject: 'body',
            minify: false               // ref: https://github.com/kangax/html-minifier#options-quick-reference
        }),
/*
        new webpack.optimize.CommonsChunkPlugin({
          name      : 'vendor',
          minChunks : (module, count) => {
            return module.resource && module.resource.indexOf(srcPath) === -1;
          }
        }),
// [ ] Chunk sorter research
// =====================
        // Place all of the sources outside 'src' into the 'vendor' bundle.
        new webpack.optimize.CommonsChunkPlugin({
          name      : 'vendor',
          minChunks : (module, count) => {
            console.log('CommonsChunkPlugin =>',count, module.rawRequest)
            module.resource
            && module.resource.indexOf(srcPath) != -1
            && module.resource.indexOf('routes') != -1 &&
            console.log("\nB => ", module.rawRequest, module.chunks[0].name ,module.resource);

            return false // module.resource
              // && module.resource.indexOf(srcPath) === -1
              //&& module.resource.indexOf('react-dom') != -1 ;
          }
        }),
*/
    ],
    performance: {
        hints: false
    }
};

export default config;
