import { TUser, TPost } from "./types";

export const users: TUser[] = [];

export const posts: TPost[] = [
    {
        id: "p001",
        content: "Hoje vou estudar POO!",
        likes: 2,
        dislikes: 1,
        createdAt: "2023-01-20T12:11:47:000Z",
        updatedAt: "2023-01-20T12:11:47:000Z",
        creator: {
            id: "uma uuid v4",
            name: "Fulano"
        }
    }
];