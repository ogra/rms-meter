const path = require('path');

module.exports = {
    entry: './src/index.esm.js',
    experiments: {
        outputModule: true
    },
    output: {
        libraryTarget: 'module',
        filename: 'rms-meter.esm.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /.+-processor\.esm\.js$/,
                loader: "audio-worklet-loader",
            },
        ],
    }
};
