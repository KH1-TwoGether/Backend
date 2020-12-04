import {Router} from 'express';

import DataHandler from "../classes/DataHandler";
import DB from "../classes/DB";
import {postValidation} from "../validation";
import {getUnixTime} from "../misc";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const docs = await DB.query("posts/all", {
            reduce: false,
            descending: true
        });
        res.status(200).json(docs);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/", async (req: any, res) => {
    let post: any;
    try {
        post = await postValidation(req.body);
    } catch ({message}) {
        res.status(400).json({error: message});
    }

    const handler = new DataHandler("post", {
        author: {
            id: req.user.id,
            name: req.user.name
        },
        content: post.content,
        date: getUnixTime()
    });
    try {
        await handler.save();
        res.status(201).send();
    } catch (e) {
        res.status(500).send();
    }
});

export default router;
