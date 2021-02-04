/* eslint-disable @typescript-eslint/no-var-requires */

import * as path from "path";

import { merge } from "webpack-merge";
import { Configuration } from "webpack";

// plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

module.exports = (env: { mode: "development" | "production" }) => {
    const developmentMode = env.mode === "development";

    const config: Configuration = {
        entry: "./src/js/script.ts",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts/",
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|ico|svg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "img",
                                name: "[name].[ext]",
                            },
                        },
                        {
                            loader: "image-webpack-loader",
                            options: {
                                bypassOnDebug: true,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 75,
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                    optimizationLevel: 1,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: [
            new HtmlWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets/**",

                        // if there are nested subdirectories , keep the hierarchy
                        transformPath(targetPath, absolutePath) {
                            const assetsPath = path.resolve(__dirname, "assets");
                            const endpPath = absolutePath.slice(assetsPath.length);

                            return Promise.resolve(`assets/${endpPath}`);
                        },
                    },
                ],
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.ts`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
