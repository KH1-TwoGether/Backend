import * as Joi from "joi";
import Model from "./base";

class User extends Model {

    public readonly name?: string;
    public readonly email?: string;
    public readonly password?: string;
    public readonly date?: UnixTime;

    constructor(data: any) {
        super(Joi.object({
            name: Joi.string().alphanum().min(3).max(30).required().external(async name => {

            }),
            email: Joi.string().email({ minDomainSegments: 2}).required(),
            password: Joi.string().min(6).required()
        }));

        if(data.name) this.name = data.name;
        if(data.email) this.email = data.email;
        if(data.password) this.password = data.password;
        if(data.date) this.date = data.date;
    }

    public async validate(): Promise<any> {
        return await super.validate({
            name: this.name,
            email: this.email,
            password: this.password
        });
    }

    public getData(): any {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            date: this.date
        };
    }

}

export default User;
