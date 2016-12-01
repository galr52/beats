/// <reference path="../_all.d.ts" />

import * as mongoose from "mongoose";

// var Schema = mongoose.Schema;

// var songSchema = new Schema({
//   name: String,
//   path: String,
//   size: Number,
//   length: String
// });

// export = mongoose.model("Song", songSchema);

// check whether or not export this
export interface ISong extends mongoose.Document {
  name: string;
  path: String;
  size: number;
  length: String;
};

// check whether or not export this
export const songSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  length: String
});

export const song = mongoose.model<ISong>("Song", songSchema);