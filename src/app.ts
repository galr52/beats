/// <reference path="_all.d.ts" />

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as expressSession from "express-session";
import { cookie } from "./helpers/cookie";
import { secret } from "./config";
import {jwt} from "./helpers/jwt";
// var authHandler = require("./auth");
var router = require("./routes");

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        this.app.use(cookie.get()(secret));
        this.app.use((req: any, res: any, next: any) => {
            if (req.user) {
                // next();
            } else {
                var cookie = req.cookies.token;
                if (cookie === undefined) {
                    let token = jwt.get().sign({ name: "bar", uniqueId: "1234", station: {name: "lobby"} }, secret);
                    res.cookie("token", token);
                }
            }

            next();
        });

        this.app.use(express.static("public"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(expressSession({
            secret: secret
            // resave: false,
            // saveUninitialized: false
        }));


        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        this.app.use("/api", router);
    }
}

var server = Server.bootstrap();
export = server.app;