const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: "./js/app.js",
    devtool: "source-map",
    watch: true,

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

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new VueLoaderPlugin()
    ]
};