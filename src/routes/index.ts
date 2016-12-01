/// <reference path="../_all.d.ts" />

import * as express from "express";
import { songController } from "../controllers/songController";
import { stationController } from "../controllers/stationController";

module Route {
    class Inner {
        private app: express.Application;
        constructor() {
            this.app = express();
            this.registerSong();
            this.registerStation();
        }

        private registerStation() {
            this.app.post("/station", stationController.addNew);
        }

        private registerSong() {
            this.app.post("/song", songController.upload);
        }

        get App(): express.Application {
            return this.app;
        }
    }
    export var router: any;
    router = new Inner();
}

var router = Route.router;
export = router.App;
// alert(router.App);