import * as express from "express";
import * as jwt from "express-jwt";
import * as cors from "cors";

import usersRoute from './routes/users';
import groupsRoute from './routes/groups';
import postsRoute from './routes/posts';
import DataHandler from "./classes/DataHandler";

// Create express instance and apply cors-restriction
const app = express();
app.use(express.json());
app.use(cors());

app.use(jwt({
    secret: process.env.TOKEN_SECRET || "",
    algorithms: ["HS256"]
}).unless({
    path: [
        "/users/register",
        "/users/login"
    ]
}));
app.use(async (req: any, res, next) => {
    if(!req.user || !req.user.id) {
        next();
        return;
    }

    const handler = new DataHandler("user", {}, req.user.id);
    try {
        await handler.load();
    } catch (e) {
        res.status(500).send();
        return;
    }

    req.user = {
        id: req.user.id,
        ...handler.data
    };

    next();
});
app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: "Access denied"});
        return;
    }
    next(err);
});

// Apply given routers
app.use("/users", usersRoute);
app.use("/groups", groupsRoute);
app.use("/posts", postsRoute);

app.listen(process.env.PORT || 8080, () => console.log("Backend running"));
