type ID = string;
type ImageUrl = string;
type UnixTime = number;

type PostAuthor = {
    name: string;
    id?: string;
};
type PostContent = string;

type PostData = {
    id?: ID;
    author?: PostAuthor;
    image?: ImageUrl;
    content?: PostContent;
    date?: UnixTime;
};
