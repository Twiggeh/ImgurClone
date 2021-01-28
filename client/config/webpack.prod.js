/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const process = require('process');
require('dotenv').config();
const mode = process.env.NODE_ENV;
const analyze = process.env.ANALYZE;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log(mode);
console.log(process.env.BACKEND_URL);
const curProcess = process.cwd();

module.exports = {
	entry: {
		main: path.resolve(curProcess, 'src/index.js'),
		vendor: [
			'react',
			'react-dom',
			'scheduler',
			'object-assign',
			'@emotion/styled',
			'prop-types',
		],
	},
	output: {
		path: path.resolve(curProcess, './dist'),
		publicPath: '/',
		filename: 'public/js/[name]-[contentHash:8].js',
		chunkFilename: 'public/js/[name]-[contentHash:8].chunk.js',
	},
	mode: 'production',
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
								'@babel/react',
								'@emotion/babel-preset-css-prop',
							],
							// don't inject babel code into each file, create a global import for them
							plugins: ['@babel/plugin-transform-runtime'],
							compact: false,
							cacheDirectory: false,
							cacheCompression: false,
							sourceMaps: false,
							inputSourceMap: false,
						},
					},
					{ loader: 'ts-loader' },
				],
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: /src/,
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/react',
						'@emotion/babel-preset-css-prop',
					],
					// don't inject babel code into each file, create a global import for them
					plugins: ['@babel/plugin-transform-runtime'],
					compact: false,
					cacheDirectory: false,
					cacheCompression: false,
					sourceMaps: false,
					inputSourceMap: false,
				},
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				// eslint-disable-next-line security/detect-unsafe-regex
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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
						name: '[name]-[contentHash:8].[ext]',
						outputPath: 'public/images/',
					},
				},
			},
			{
				test: /\.gif?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]-[contentHash:8].[ext]',
						outputPath: 'public/gif/',
					},
				},
			},
			{
				test: /\.m4v?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]-[contentHash:8].[ext]',
						outputPath: 'public/video/',
					},
				},
			},
			{
				test: /\.pdf$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[contentHash:3]-[name].[ext]',
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
			icons: path.resolve(curProcess, './src/assets/icons'),
			assets: path.resolve(curProcess, './src/assets'),
			pictures: path.resolve(curProcess, './src/static/Pictures.js'),
		},
		modules: ['src', 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin()],
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: 'vendor',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},
	node: { curProcess: true, __filename: true }, // to get correct curProcess and __filename
	// prettier-ignore
	plugins: [
		analyze === 'true'
			? new BundleAnalyzerPlugin({
				analyzerMode: 'server',
			})
			: false,
		// Find a new minifier, uglify js doesn't support es6 syntax, which is what ts compiles down to
		// alternatively set a different js version with babel
		//new UglifyJSPlugin(),
		new MiniCssExtractPlugin({
			filename: 'public/css/[name]-[contenthash:8].css',
			chunkFilename: 'public/css/[name]-[contenthash:8].chunk.css',
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(curProcess, 'src/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			BACKEND_SERVER_URL: JSON.stringify(process.env.BACKEND_URL),
		})
	].filter(Boolean),
};
