"use strict";
const express = require("express");
class Server {
    constructor() {
        this.app = express();
    }
    static bootstrap() {
        return new Server();
    }
}
