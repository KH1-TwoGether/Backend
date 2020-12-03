type ID = string;
type ModelType = "user" | "group" | "post";

type ImageUrl = string;
type UnixTime = number;



type PostAuthor = {
    name: string;
    id?: string;
};
type PostContent = string;
type PostModel = {
    author?: PostAuthor;
    image?: ImageUrl;
    content?: PostContent;
    date?: UnixTime;
};
