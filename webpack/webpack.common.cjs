const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "..", "./src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "../images/[hash][ext][query]"
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "../fonts/[hash][ext][query]"
                }
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "..", "static/lep/js"),
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html"),
            filename: path.resolve(__dirname, "..", "templates/lep/index.html"),
        }),
    ],
    stats: "errors-only",
};