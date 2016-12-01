/// <reference path="../_all.d.ts" />

import * as mongoose from "mongoose";

// check whether or not export this
export interface IStation extends mongoose.Document {
  name: string;
  history: Array<any>; //[{ type : mongoose.Schema.Types.ObjectId, ref: "Song" }];
};

// check whether or not export this
export const stationSchema = new mongoose.Schema({
  name: String,
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

export const station = mongoose.model<IStation>("Station", stationSchema);