/// <reference path="../_all.d.ts" />

// import * as express from "express";
import * as  multer from "multer";
import * as config from "../config";
import * as shortid from "shortid";
import * as Songs from "../models/song";
import * as express from "express";
import {secret} from "../config";
var cookie = require("../helpers/cookie").cookie;
var jwt = require("../helpers/jwt").jwt;

let storage: multer.StorageEngine;
storage = multer.diskStorage({
    destination: config.storageLocation,
    filename: function (req: any, file: any, cb: Function) {
        cb(null, shortid.generate() + "_" + file.originalname);
    }

});
var multerUpload = multer({ storage: storage }).any();

export module songController {
    export function upload(req: any, res: express.Response) {
        cookie.get().JSONCookie("niki");
        var token = jwt.get().sign({ foo: "bar", name: "moshe" }, secret);

        console.log("token ", token);

        multerUpload(req, res, (err: any) => {
            if (err) {
                console.log(err);
                return res.status(500).end();
            }

            //single file
            Songs.song.create({
                name: req.files[0].originalname,
                path: req.files[0].path,
                size: req.files[0].size,
            }, function (err: any, doc: any) {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    console.log("saved");
                    res.status(200).end();
                }
            });

        });
    }
}