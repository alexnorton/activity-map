module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  devtool: 'eval',
};
