import * as express from "express";
import DB, { filterDoc } from "../classes/DB";
import { response } from "../misc";

const router = express.Router();

router.get("/", (req, res) => {
    DB.query("").then(({rows}) => {
        let data: any[] = [];
        rows.forEach((doc: any) => data.push(filterDoc(doc)));
        response(req, res, 200, data);
    }).catch(() => response(req, res, 404));
});

router.get("*", (req, res) => {
    /*
    DB.find(req.path.substring(1)).then(({docs}) => {
        response(req, res, 200, filterDoc(docs[0]));
    }).catch(() => response(req, res, 404));
     */
    response(req, res, 200);
});

router.put("*", (req, res) => {
    response(req, res, 200);
});

router.delete("*", (req, res) => {
    response(req, res, 200);
});

export default router;
