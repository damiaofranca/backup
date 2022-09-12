const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "rgb(30, 45, 105);",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
