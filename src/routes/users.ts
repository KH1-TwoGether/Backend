import {Router} from "express";
import * as jwt from "jsonwebtoken";

import DataHandler from "../classes/DataHandler";
import {getUnixTime} from "../misc";
import {loginValidation, registerValidation} from "../validation";
import DB, {filterDoc} from "../classes/DB";

const router = Router();

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

router.get("/", async (req: any, res) => {
    const data = await DB.get(req.user.id);
    const filtered = filterDoc(data);
    if(filtered.password) delete filtered.password;
    res.status(200).json(filtered);
});

export default router;
