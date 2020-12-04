import {Router} from 'express';
//import DB from "../classes/DB";

const router = Router();

router.get("/", (req, res) => {

    //DB.query("posts/all");

    res.status(501).send();
});

export default router;
