module.exports = {
  context: __dirname + '/src/website',
  entry: './js/main.js',
  output: {
    path: __dirname + '/build/src/website',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module : {
        loaders : [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }               
            },
            {
              test: /\.css$/,
              loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
            }
        ]
    }
}
