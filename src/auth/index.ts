import { secret } from "../config";
import { jwt } from "../helpers/jwt";
export const authHandler = (req: any, res: any, next: any) => {
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
};