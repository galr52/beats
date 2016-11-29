"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var router = require("./routes");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(express.static("public"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    Server.prototype.routes = function () {
        this.app.use("/api", router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
