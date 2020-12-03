class Model {

    protected readonly scheme: any;

    constructor(scheme: any) {
        this.scheme = scheme;
    }

    public async validate(data: any): Promise<any> {
        return await this.scheme.validateAsync(data);
    }

    public getData(): any {}

}

export default Model;
