export const defaultReply: Reply = {
    message: ''
};

export interface Reply {
    message: string;
}

export interface StoredReply extends Reply {
    author: string;
    created_at: string;
}
