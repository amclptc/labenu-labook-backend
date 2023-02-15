export type TUser = {
    name: string,
    email: string,
    password: string
};

export type TPost = {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
};