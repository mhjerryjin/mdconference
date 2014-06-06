var http_server = function () {

    var _this = this;
    var http = require("http"); //http服务器
    var cluster = require('cluster');
    var url = require("url");
    var numCPUs = require('os').cpus().length;
    var route = require("./router").route;
    var cfg = require("./config");
    var config = cfg.config;
    var handle = cfg.router;
    /*	
    *	启动HTTP服务器 并且运行框架
    */
    this.start = function () {
        var listen = config.server.port;
        if (cluster.isMaster) {
            for (var i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', function (worker, code, signal) {
                console.log('error: ' + worker.process.pid + ' died');
            });
        }
        else {
            http.createServer(_this.on).listen(listen, function () {
                console.log("success:在" + listen + "上跑起来了");
            });
        }
    };

    this.on = function (req, res) {
        var pathname = url.parse(req.url).pathname;
        route(handle, pathname, res, req);
    };
}

module.exports = http_server;