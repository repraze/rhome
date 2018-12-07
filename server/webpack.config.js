const path = require('path');

module.exports = {
    target: 'web',
    entry: [
        '@babel/polyfill',
        './app/index.jsx',
    ],
    output: {
        filename:   'rhome.js',
        path:       path.resolve(__dirname, 'public', 'js'),
        publicPath: '/js/',
        chunkFilename: '[name].rchunk.js'
    },
    module: {
        rules: [
            {
                test:    /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use:     {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css/,
                use:  [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }]
            },
            {
                test: /\.(sass|scss)$/,
                use:  [{
                    loader: "style-loader/useable" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Less to CSS
                }]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules:    [
            'node_modules',
            // path.resolve(__dirname, 'app'),
        ]
    }
};
