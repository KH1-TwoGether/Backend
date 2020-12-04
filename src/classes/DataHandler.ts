import DB, {filterDoc} from "./DB";
import {nanoid} from "nanoid";

class DataHandler {

    public readonly id: ID;
    public readonly type: ModelType;
    public data: any;

    constructor(type: ModelType, data: any, id?: ID) {
        if (!id) id = Math.floor(Math.random() * 9) + nanoid(31);
        this.id = id;
        this.type = type;
        this.data = data;
    }

    public async load(): Promise<void> {
        this.data = await DB.get(this.id);
    }

    public async save(): Promise<void> {
        await DB.put({
            _id: this.id,
            type: this.type,
            ...this.data
        });
    }

    public get filtered() {
        return filterDoc(this.data);
    }

}

export default DataHandler;
