import * as express from "express";
import { response } from "../misc";

const router = express.Router();

router.get("/", (req, res) => {
    response(req, res, 200);
});

export default router;
