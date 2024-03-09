const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = (env) => {
    const isDev = env.mode === 'development';
    return {
        mode: env.mode ?? 'development',
        entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'script.js')],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: "style.[contenthash].css",
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ]
                      }
                    }
                  }
              ],
        },
        devtool: isDev ? 'inline-source-map': false,
        devServer: isDev ? {
            port: 5000,
            open: true,
        }: undefined,
    }
}