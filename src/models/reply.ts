export const defaultReply: Reply = {
    message: ''
};

export interface Reply {
    message: string;
}

export interface StoredReply extends Reply {
    key: string;
    author: string;
    authorPhotoURL?: string;
    createdAt: string;
}
