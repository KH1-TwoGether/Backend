import * as express from "express";
import * as jwt from "jsonwebtoken";

import DataHandler from "../classes/DataHandler";
import {getUnixTime} from "../misc";
import {loginValidation, registerValidation} from "../validation";

const router = express.Router();

router.post("/register", async (req, res) => {
    let user: any;
    try {
        user = await registerValidation(req.body);
    } catch ({message}) {
        res.status(400).json({error: message});
        return;
    }

    const handler = new DataHandler("user", {
        name: user.name,
        email: user.email,
        password: user.password,
        date: getUnixTime()
    });
    try {
        await handler.save();
        res.status(201).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    let user: any;
    try {
        user = await loginValidation(req.body);
    } catch (e) {
        res.status(400).json({error: "Invalid user or password"});
        return;
    }

    const handler = new DataHandler("user", {}, user.user);
    try {
        await handler.load();
    } catch (e) {
        res.status(500).send();
        return;
    }

    const token = jwt.sign({
        id: handler.id
    }, process.env.TOKEN_SECRET || "");

    res.header("Token", token).status(200).json({token});
});

export default router;
