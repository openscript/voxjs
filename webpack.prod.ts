import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import {Configuration, DefinePlugin, LoaderOptionsPlugin} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const config: Configuration = {
    mode: 'production',
    entry: ['./src/index.tsx'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.scss'],
        modules: [path.resolve(__dirname, 'examples'), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }, {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.prod.json'
                    }
                }]
            }, {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }]
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            })
        ]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BASE_URL: JSON.stringify('/')
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ]
};

export = config;
