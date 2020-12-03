import * as express from "express";
import ModelHandler from "../classes/ModelHandler";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: (new Date).getTime()
    });
    const { error } = await user.validate();
    if(error) {
        const errors: string[] = [];
        error.details.forEach((info: any) => errors.push(info.message));
        res.status(400).json({errors});
    } else {
        const handler = new ModelHandler("user", user);
        await handler.save();
        res.status(201).send();
    }
});

router.post("/login", (req, res) => {
    res.status(501).send();
});

export default router;
