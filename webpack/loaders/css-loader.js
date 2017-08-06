"use strict";
exports.__esModule = true;
var loaders = function (c) {
    var frontendDir = function (path) {
        if (path === void 0) { path = ''; }
        return c.rootDir + "/src/frontend/" + path;
    };
    return [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: true,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function () { return [
                    require('postcss-import')({ path: [frontendDir()] }),
                    require('postcss-cssnext')(),
                    require('postcss-assets')({ relative: frontendDir() }),
                ]; }
            }
        },
    ];
};
exports.partial = function (c) { return ({
    module: {
        rules: [
            {
                include: c.rootDir,
                test: /\.css?$/,
                use: loaders(c),
                exclude: /node_modules/
            },
        ]
    }
}); };
