module.exports = {
  mode: 'production',
  devtool: "eval", // eval false 的区别是有没有 eval
  entry: {
    a: './src/a.js',
    b: './src/b.js',
  },
  output: {
    ecmaVersion: 5,
    filename: "[name]-[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      minSize: 1,
      chunks: 'all',
      name: 'commons'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }

    ]
  }
}
