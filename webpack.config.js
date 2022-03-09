const path = require('path');

module.exports = {
    mode : 'development',
    entry : path.resolve(__dirname, 'frontend', 'main'),
    output : {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map'
};

//  module.exports = {
//     mode : 'development',
//     entry : path.resolve(__dirname, 'frontend', 'stylesmain'),
//     output : {
//         path: path.resolve(__dirname, 'public', 'assets', 'js'),
//          filename: 'styles.js'
//      },
//      module: {
//          rules: [{
//              exclude: /node_modules/,
//              test: /\.js$/,
//              use: {
//                  loader: 'babel-loader',
//                  options: {
//                      presets: ['@babel/env']
//                  }
//              }
//          }, {
//              test: /\.css$/,
//              use: ['style-loader', 'css-loader']
//          }]
//      },
//      devtool: 'source-map'
// };