const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

plugins.push(
	new CopyWebpackPlugin({
		patterns: [
			{
				from: path.resolve(__dirname, 'node_modules/ps-list/vendor'),
				to: 'vendor'
			}
		]
	})
);

module.exports = {
	entry: './src/index.ts',
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
	},
};
