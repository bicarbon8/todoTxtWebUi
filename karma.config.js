module.exports = function(config) {
    config.set({
        singleRun: true,
        
        // minimum plugins required for this implementation to work
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-webpack'),
            require('karma-typescript'),
            require('karma-coverage')
        ],

        // start these browsers
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],

        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless']
            }
        },

        // framework to use for tests
        frameworks: ['jasmine', 'karma-typescript'],

        preprocessors: {
            "./src/**/*.ts": ["karma-typescript"],
            "./test/**/*.ts": ["karma-typescript"]
        },

        files: [
            { pattern: './src/**/*.ts' },
            { pattern: './test/**/*.ts' },
            { pattern: './css/*.css' }
        ],

        reporters: ["progress", "karma-typescript", "coverage"]
    });
};