const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { "@primary-color": "rgb(138, 186, 36);" },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
