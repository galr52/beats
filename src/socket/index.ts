/// <reference path="../_all.d.ts" />

// import * as jwt from "../helpers/jwt";
// import
var server = require("socket.io");
var socketioJwt = require("socketio-jwt");
import * as config from "../config";


export class Socket {
    public io: any;
    constructor(httpServer: any) {
        this.io = new server(httpServer);
        this.useJwt();
        this.setConnections();
    }

    private useJwt() {
        this.io.use(socketioJwt.authorize({
            secret: config.secret,
            handshake: true
        }));
        this.io.on("unauthorized", function (error: any) {
            if (error.data.type === "UnauthorizedError" || error.data.code === "invalid_token") {
                // redirect user to login page perhaps?
                console.log("User's token has expired");
            }
        });
    }

    private setConnections() {
        this.io.on("connection", (socket: any) => {
            // if ()
            console.log("a user connected");
            console.log("hello! ", socket.decoded_token.name);
            socket.on("disconnect", function () {
                console.log("user disconnected");
            });
        });
    }
}

//export = new Socket().io;