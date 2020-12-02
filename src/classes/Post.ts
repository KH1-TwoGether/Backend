import DB from "./DB";

class Post {

    public id: ID;
    public author: PostAuthor;
    public image: ImageUrl;
    public content: PostContent;
    public date: UnixTime;

    constructor(data: PostData) {
        if(data.id) {
            this.id = data.id;
            this.load();
        } else {
            this.id = "";
        }

        if(data.author) this.author = data.author;
        if(data.image) this.image = data.image;
        if(data.content) this.content = data.content;
        if(data.date) this.date = data.date;
    }

    public load() {
        // load the contact from the database
        // select by id
    }

    public save() {
        // save the contact to the database
        // if id is set, update
        // else create new
    }
}
