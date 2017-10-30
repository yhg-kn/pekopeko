const path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './resources/assets/js/app.js',                                                                
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};