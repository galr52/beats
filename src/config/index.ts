var config = require("./config");

export const storageLocation: string = config.storageLocation;

export const getMongoConnection = () : string => {
    return `mongodb://${config.db.username}:${config.db.password}@ds119748.mlab.com:19748/beats`;
};

export const secret: string = config.secret;