const path = require('path');

module.exports = { //webpack bacomes this object;
  entry: './src/index.js',//entry point
  output: {//exit point
    filename: 'script.js',//create new js file, like main.js for whole code of project;
    path: path.resolve(__dirname, './dist') //location of file //dirname-beginning of the file system(macintosh/Katerynaonufr) to finish - .dist
  },
  mode: 'development',
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      }
    ]
  }



};