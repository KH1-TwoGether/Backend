import {Router} from "express";
import * as jwt from "jsonwebtoken";

import DataHandler from "../classes/DataHandler";
import {getUnixTime} from "../misc";
import {editValidation, loginValidation, registerValidation} from "../validation";
import DB from "../classes/DB";

const router = Router();

router.get("/", async (req: any, res) => {
    delete req.user.password;
    res.status(200).json(req.user);
});

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

    const token = jwt.sign({id: handler.id}, process.env.TOKEN_SECRET || "");

    res.header("Token", token).status(200).json({token});
});

router.put("/", async (req: any, res) => {
    const handler = new DataHandler("user", {}, req.user.id);
    try {
        await handler.load();
    } catch (e) {
        res.status(500).send();
        return;
    }

    let data: any;
    try {
        data = await editValidation(req.body);
    } catch ({message}) {
        res.status(400).json({error: message});
        return;
    }

    let update = false;
    Object.keys(data).forEach(key => {
        if(!data[key]) return;
        handler.data[key] = data[key];
        update = true;
    });

    if(!update) {
        res.status(409).send();
        return;
    }

    try {
        await handler.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/", async (req: any, res) => {
    try {
        const doc = await DB.get(req.user.id);
        await DB.remove(doc);
        res.status(200).send();
    } catch(e) {
        res.status(500).send();
    }
});

export default router;
