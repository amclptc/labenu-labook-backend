import { PostModel } from "../types"

export interface getPostsInputDTO {
    token: string | undefined
};

export type getPostsOutputDTO = PostModel [];

export interface createPostInputDTO {
    token: string | undefined
};

export interface editPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    name: unknown
};

export interface deletePostInputDTO {
    idToDelete: string,
    token: string | undefined
};

