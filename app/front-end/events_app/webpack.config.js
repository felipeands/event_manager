const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const providePlugin = new webpack.ProvidePlugin({
    Raphael: 'raphael'
})

module.exports = {
    entry: "./src/index.js",
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [providePlugin, new CompressionWebpackPlugin()]
};
