import { Request, Response } from "express";
import * as uuid from "uuid";

export function getTypeNamespace(type: ModelType) {
    return uuid.v5(type, uuid.NIL);
}

let states = {
    200: {
        error: "",
        message: "Request successfully processed"
    },
    404: {
        error: "Not Found",
        message: "You reached the end of this road"
    }
}

let filterableProps = ["title", "type"];

export function response(req: Request, res: Response, status: number, data: any = {}) {
    // object for additional info
    let info = {
        start: 0,
        limit: 0,
        size: 0,
    };

    // Some additional processing if data is an array
    if(Array.isArray(data)) {
        // Filter by {properties}
        Object.keys(req.query).forEach(prop => {
            if(!filterableProps.includes(prop) || !req.query[prop]) return;
            // @ts-ignore
            data = data.filter((el: any) => el[prop] && el[prop].toUpperCase().includes(req.query[prop].toString().toUpperCase()));
        });

        // sort by...
        if(req.query.sort) {
            // ...date
            if(req.query.sort.toString() === "date") {
                data.sort((a, b) => {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a > b ? -1 : a < b ? 1 : 0;
                });
            }
        }

        // pagination {start|limit}
        let start = parseInt(req.query.start ? req.query.start.toString() : "0");
        if(start) {
            info.start = start;
            data = data.slice(start);
        }

        let limit = parseInt(req.query.limit ? req.query.limit.toString() : "20");
        if(!limit) limit = 20;
        if(limit <= 0 || limit > 20) limit = 20;
        info.limit = limit;
        data = data.slice(0, limit);

        info.size = data.length;
    }

    // @ts-ignore
    let {error, message} = states[status];
    res.status(status);
    res.json({
        error,
        message,
        ...info,
        response: data ? data : {}
    });
}
