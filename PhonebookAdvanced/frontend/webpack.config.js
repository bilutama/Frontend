const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./js/app.js",
    devtool: "source-map",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public"),
        assetModuleFilename: "[path][name][ext]?[contenthash]"
    },

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.runtime.esm.js"
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                include: [/node_modules\/bootstrap/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                type: "asset/resource"
            }
        ]
    },

    devServer: {
        hot: true,
        open: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebPackPlugin({
            template: "index.html",
        })
    ]
};
