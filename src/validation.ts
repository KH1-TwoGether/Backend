import * as Joi from "joi";
import * as bcrypt from "bcrypt";
import DB from "./classes/DB";

export const registerValidation = async (data: any) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required().external(async name => {
            const {rows} = await DB.query("users/names", {key: name, reduce: true});
            if (rows.length && rows[0].value === 1) throw new Error("Already exists");
        }, "Check if the name is already in use"),
        email: Joi.string().email({minDomainSegments: 2}).required().external(async email => {
            const {rows} = await DB.query("users/emails", {key: email, reduce: true});
            if (rows.length && rows[0].value === 1) throw new Error("Already exists");
        }, "Check if the email is already in use"),
        password: Joi.string().min(6).required().external(async password => {
            return await bcrypt.hash(password, 10);
        })
    });
    return await schema.validateAsync({
        name: data.name,
        email: data.email,
        password: data.password
    });
}

export const loginValidation = async (data: any) => {
    let id: any;
    const schema = Joi.object({
        user: Joi.string().min(3).required().external(async user => {
            const data1 = await DB.query("users/names", {key: user, reduce: false});
            if (data1.rows.length) return id = data1.rows[0].id;
            const data2 = await DB.query("users/emails", {key: user, reduce: false});
            if (data2.rows.length) return id = data2.rows[0].id;
            throw new Error("Does not exist");
        }),
        password: Joi.string().min(6).required().external(async password => {
            const data: any = await DB.get(id);
            if (!await bcrypt.compare(password, data.password)) throw new Error("Wrong password");
        })
    });
    return await schema.validateAsync({
        user: data.user,
        password: data.password
    });
}

export const editValidation = async (data: any) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).external(async name => {
            if(!name) return;
            const {rows} = await DB.query("users/names", {key: name, reduce: true});
            if (rows.length && rows[0].value === 1) throw new Error("Already exists");
        }, "Check if the name is already in use"),
        email: Joi.string().email({minDomainSegments: 2}).external(async email => {
            if(!email) return;
            const {rows} = await DB.query("users/emails", {key: email, reduce: true});
            if (rows.length && rows[0].value === 1) throw new Error("Already exists");
        }, "Check if the email is already in use"),
        password: Joi.string().min(6).external(async password => {
            if(!password) return;
            return await bcrypt.hash(password, 10);
        })
    });
    return await schema.validateAsync({
        name: data.name,
        email: data.email,
        password: data.password
    });
}

export const postValidation = async (data: any) => {
    const schema = Joi.object({
        content: Joi.string().max(120).required()
    });
    return await schema.validateAsync({
        content: data.content
    });
}
