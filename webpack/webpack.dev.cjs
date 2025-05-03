const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "..", "templates/lep"), // Указываем корневую директорию
        },
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            }
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: (resourcePath) => !resourcePath.includes('shared/assets/styles'),
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                exportLocalsConvention: 'camelCaseOnly',
                                mode: 'local',
                            },
                            esModule: true,
                            importLoaders: 2,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify("Dev"),
        }),
    ],
};