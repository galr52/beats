/// <reference path="../_all.d.ts" />

import * as mongoose from "mongoose";

// check whether or not export this
export interface IUser extends mongoose.Document {
    uniqueId: string;
    name: string;
    station: any;
};

// check whether or not export this
export const userSchema = new mongoose.Schema({
    uniqueId: String,
    name: String,
    station: { type: mongoose.Schema.Types.ObjectId, ref: "Station" }
});

export const user = mongoose.model<IUser>("User", userSchema);