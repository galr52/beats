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
        var self = this;
        this.io.on("connection", (socket: any) => {
            // if ()
            console.log("a user connected");
            console.log("hello! ", socket.decoded_token.name);
            socket.nickname = socket.decoded_token.name;
            socket.join(socket.decoded_token.station.name);
            let clients = self.getAllUsers(socket.decoded_token.station.name);
            self.notifyToRoom(socket.decoded_token.station.name, "user connected", clients);
            socket.on("disconnect", function () {
                console.log("user disconnected");
            });
        });
    }

    private getAllUsers(roomName: string) {
        // return this.io.sockets.clients(roomName);
        var namespace = "/";
        let clients = Array<any>();
        // for (var socketId in this.io.sockets.adapter.rooms[roomName]) {
        //    this.io.sockets.adapter.rooms[roomName]
        // }
        for (var clientId in this.io.sockets.adapter.rooms[roomName].sockets) {
            if (clientId) {
                clients.push(this.io.sockets.connected[clientId].nickname);
            }
        }
        return clients;
    }

    private notifyToRoom(roomName: string, eveentName: string, data: any) {
        // this.io.to(roomName).emit(eveentName, data);
        var self = this;

        setTimeout(function () {
            self.io.to(roomName).emit(eveentName, data);
        }, 100);
    }

}

//export = new Socket().io;