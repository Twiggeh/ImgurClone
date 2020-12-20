/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const process = require('process');
require('dotenv').config();
const mode = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
console.log(mode);
const curProcess = process.cwd();

module.exports = {
	entry: ['react-hot-loader/patch', path.resolve(curProcess, 'src')],
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(curProcess, 'src/'),
		historyApiFallback: true,
		hot: true,
		compress: true,
	},
	mode: 'development',
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/react',
						'@emotion/babel-preset-css-prop',
					],
					// don't inject babel code into each file, create a global import for them
					plugins: [
						'react-hot-loader/babel',
						'@babel/plugin-transform-runtime',
						// [
						// 	'@emotion',
						// 	{
						// 		// sourceMap is on by default but source maps are dead code eliminated in production
						// 		sourceMap: true,
						// 		autoLabel: 'always',
						// 		labelFormat: '[local]',
						// 		cssPropOptimization: true,
						// 	},
						// ],
					],
					compact: false,
					cacheDirectory: true,
					cacheCompression: false,
					sourceMaps: true,
					inputSourceMap: true,
				},
			},
			{
				test: /\.css?$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'public/fonts/',
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|png|webp)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/images/',
					},
				},
			},
			{
				test: /\.gif?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/gif/',
					},
				},
			},
			{
				test: /\.m4v?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/video/',
					},
				},
			},
			//			{
			//				test: /\.html?$/,
			//				use: {
			//					loader: 'file-loader',
			//					options: {
			//						name: '[name].[ext]',
			//						outputPath: 'webpages',
			//					},
			//				},
			//			},
			{
				test: /\.pdf$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/pdf/',
					},
				},
			},
			{
				test: /\.svg$/,
				use: [
					'babel-loader',
					{
						loader: 'react-svg-loader',
						options: {
							svgo: {
								plugins: [{ removeDimensions: true, removeViewBox: false }],
								floatPrecision: 2,
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
			icons: path.resolve(curProcess, './src/assets/icons'),
			assetFiles: path.resolve(curProcess, './src/assets'),
			pictures: path.resolve(curProcess, './src/static/Pictures.js'),
			assets: path.resolve(curProcess, './src/utils/assetImports.js'),
		},
		modules: ['src', 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	node: { __dirname: true, __filename: true }, // to get correct __dirname and __filename
	// prettier-ignore
	plugins: [
		new ESLintPlugin,
		new HtmlWebpackPlugin({
			template: path.resolve(curProcess, 'src/index.dev.html'),
			filename: 'index.html',
		}),
		new webpack.DefinePlugin({
			MY_VARIABLES: JSON.stringify('Must stringify a String, don\'t ask me why.'),
		}),
	],
};
