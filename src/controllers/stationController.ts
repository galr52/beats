/// <reference path="../_all.d.ts" />

import * as config from "../config";
import * as Station from "../models/station";
import * as express from "express";

export module stationController {
    export function addNew(req: express.Request, res: express.Response) {
        if (req.body.station && req.body.station.name) {
            Station.station.create({
                name: req.body.station.name
            }, function (err: any, doc: Station.IStation) {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    console.log("saved");
                    res.status(200).send(doc);
                }
            });
        } else {
            res.status(400).send("Bad Request");
        }
    }
}