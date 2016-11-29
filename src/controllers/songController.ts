/// <reference path="../_all.d.ts" />

// import * as express from "express";
import * as  multer from "multer";
import * as config from "../config";
import * as shortid from "shortid";
import * as Songs from "../models/song";

let storage: multer.StorageEngine;
storage = multer.diskStorage({
    destination: config.storageLocation,
    filename: function (req: any, file: any, cb: Function) {
        cb(null, shortid.generate() + "_" + file.originalname);
    }

});
var multerUpload = multer({ storage: storage }).any();

class SongController {
    private uploader: any;

    public upload(req: any, res: any) {

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
                } else {
                    console.log("saved");
                    res.status(200).end();
                }
            });

        });
    }
}

export const uploader = new SongController().upload;