import * as express from "express";
//import DB  from "../classes/DB";
import { response } from "../misc";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send();
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
