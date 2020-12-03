import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello world!");
});

router.get("*", (req, res) => {
    /*
    DB.find(req.path.substring(1)).then(({docs}) => {
        response(req, res, 200, filterDoc(docs[0]));
    }).catch(() => response(req, res, 404));
     */
    res.status(501).send();
});

router.put("*", (req, res) => {
    res.status(501).send();
});

router.delete("*", (req, res) => {
    res.status(501).send();
});

export default router;
