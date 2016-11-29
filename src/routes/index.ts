/// <reference path="../_all.d.ts" />

import * as express from "express";
import * as songController from "../controllers/songController";


// class Route {
//     public static route(): Route {
//         return new Route();
//     }
//     public app: express.Application;
//     constructor() {
//         this.app = express();
//         this.registerSong();
//     }

//     private registerSong() {
//         this.app.post("/song/upload", songController.upload);
//     }
//     // public upload(req: express.Request, res: express.Response, next: express.NextFunction) {

//     // }
// }

// module Route {
// }

// export = Route.route().app;

module Route {
    class Inner {
        private app: express.Application;
        constructor() {
            this.app = express();
            this.registerSong();
        }

        private registerSong() {
            this.app.post("/song/upload", songController.uploader);
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