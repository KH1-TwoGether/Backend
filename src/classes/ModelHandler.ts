import * as uuid from 'uuid';

import DB from "./DB";
import { getTypeNamespace } from "../misc";
import Model from "../models/base";



class ModelHandler {

    private readonly id: ID;
    public readonly type: ModelType;
    public readonly model: Model;

    constructor(type: ModelType, model: Model, id?: ID) {
        if(!id) id = uuid.v5(uuid.v1(), getTypeNamespace(type));
        this.id = id;
        this.type = type;
        this.model = model;
    }

    public async load(): Promise<void> {
        //const doc = {};
        //doc._id && delete doc._id;
        //doc._rev && delete doc._rev;
    }

    public async save(): Promise<void> {
        await DB.put({
            _id: this.getId(),
            ...this.model.getData()
        });
    }

    public getId(): ID {
        return `${this.type}_${this.id}`;
    }

}

export default ModelHandler;
