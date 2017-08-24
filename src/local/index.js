'use strict';

const server = require('ocbesbn-web-init');

server.init({
    routes: {
        addRoutes: false
    },
    server: {
        port: 3000,
        indexFilePath: __dirname + '/index.html',
        staticFilePath: __dirname + '/static',
        webpack: {
            useWebpack: true,
            configFilePath: __dirname + '/../../webpack.development.config.js'
        }
    }
})
