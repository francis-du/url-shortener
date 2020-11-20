const path = require('path')
const webpack = require('webpack')
const dotenv = require("dotenv-webpack");

const mode = process.env.NODE_ENV || 'production'

module.exports = {
    output: {
        filename: `worker.${mode}.js`,
        path: path.join(__dirname, 'dist'),
    },
    mode,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.env?$/,
                loader: 'raw-loader',
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
          SHORT_SECRET_KEY: JSON.stringify(process.env.SHORT_SECRET_KEY)
        })
    ]
}
