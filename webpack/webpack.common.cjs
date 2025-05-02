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
                test: /\.svg$/i,
                oneOf: [
                    {
                        issuer: /\.[jt]sx?$/,
                        use: ["@svgr/webpack"],
                    },
                    {
                        type: "asset/resource",
                        generator: {
                            filename: "../images/[hash][ext][query]",
                        },
                    },
                ],
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
            template: path.resolve(__dirname, "..", "src", "index.html"),
            filename: "index.html",
            inject: "body"
        })
    ],
    stats: "errors-only",
};