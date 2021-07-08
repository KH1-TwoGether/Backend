import DB from "./DB";
import { nanoid } from "nanoid";

class DataHandler {

  public readonly id: ID;
  private rev: REV;
  public readonly type: ModelType;
  public data: any;

  constructor(type: ModelType, data: any, id?: ID) {
    if (!id && data._id) id = data._id;
    if (!id) id = Math.floor(Math.random() * 9) + nanoid(31);
    this.id = id;
    if (data._rev) this.rev = data._rev;
    this.type = type;
    this.data = data;
    this.filter();
  }

  public async load(): Promise<void> {
    const data: any = await DB.get(this.id);
    this.data = data;
    if (data._rev) this.rev = data._rev;
    this.filter();
  }

  public async save(): Promise<void> {
    await DB.put({
      _id: this.id,
      _rev: this.rev,
      type: this.type,
      ...this.data
    });
  }

  private filter(): void {
    const data = this.data;
    if (data._id) delete data._id;
    if (data._rev) delete data._rev;
    if (data.type) delete data.type;
    this.data = data;
  }

}

export default DataHandler;
