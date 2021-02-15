/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const process = require('process');
require('dotenv').config();
const mode = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
console.log(mode);

module.exports = {
	entry: ['react-hot-loader/patch', path.resolve(__dirname, '../src')],
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: 'public/js/bundle.js',
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../src/assets'),
		contentBasePublicPath: '/',
		historyApiFallback: true,
		hot: true,
		compress: true,
		writeToDisk: true,
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@emotion/babel-preset-css-prop',
							],
							// don't inject babel code into each file, create a global import for them
							plugins: [
								'@babel/plugin-transform-runtime',
								'react-hot-loader/babel',
								'istanbul',
							],
							compact: false,
							cacheDirectory: true,
							cacheCompression: false,
							sourceMaps: true,
							inputSourceMap: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								target: 'esnext',
								module: 'esnext',
								react: 'preserve',
								lib: ['dom', 'dom.iterable', 'esnext'],
								transpileOnly: true,
							},
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: /src/,
				use: [
					{
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
								'istanbul',
							],
							compact: false,
							cacheDirectory: true,
							cacheCompression: false,
							sourceMaps: true,
							inputSourceMap: true,
						},
					},
				],
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
			icons: path.resolve(__dirname, '../src/assets/icons'),
			assetFiles: path.resolve(__dirname, '../src/assets'),
			pictures: path.resolve(__dirname, '../src/static/Pictures'),
			assets: path.resolve(__dirname, '../src/utils/assetImports'),
		},
		modules: ['src', 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	// prettier-ignore
	plugins: [
		new ESLintPlugin,
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),

			filename: 'index.html',
		}),
		new webpack.DefinePlugin({
			BACKEND_SERVER_URL: JSON.stringify(process.env.BACKEND_URL),
		}),
	],
};
