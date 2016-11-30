/// <reference path="../_all.d.ts" />

var server = require("socket.io");

export class Socket {
    public io: any;
    constructor(httpServer: any) {
        this.io = new server(httpServer);
        this.setConnections();
    }

    private setConnections() {
        this.io.on("connection", (socket: any) => {
            console.log("a user connected");
            socket.on("disconnect", function () {
                console.log("user disconnected");
            });
        });
    }
}

//export = new Socket().io;