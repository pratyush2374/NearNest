interface User {
    fullName: string;
    username: string;
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

interface Reaction {
    id: string;
    userId: string;
    postId: string;
    type: string;
    createdAt: string;
}

interface User {
    fullName: string;
    username: string;
}

interface PostData {
    id: string;
    content: string;
    media: string[];
    type:
        | "LOCAL_UPDATE"
        | "PLACE_RECOMMENDATION"
        | "HELP"
        | "EVENT_ANNOUNCEMENT";
    user: User;
    userId: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    reactions: Reaction[];
    comments: Comment[];
}

export default PostData;