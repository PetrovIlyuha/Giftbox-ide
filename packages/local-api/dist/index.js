"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveDocs = void 0;
var http_proxy_middleware_1 = require("http-proxy-middleware");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cells_1 = require("./routes/cells");
var serveDocs = function (port, filename, dir, useProxy) {
    var app = express_1.default();
    app.use(cells_1.createCellsRouter(filename, dir));
    if (useProxy) {
        console.log('serving locally using proxy');
        app.use(http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        var packageBuildPath = require.resolve('@giftbox-cli/local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packageBuildPath)));
    }
    return new Promise(function (resolve, reject) {
        app
            .listen(port, function () {
            console.log("Served on port " + port);
            resolve();
        })
            .on('error', reject);
    });
};
exports.serveDocs = serveDocs;
