import { Component, h } from 'preact';
import { StoredReply } from '../models/reply';
import { ReplyDisplay } from './replyDisplay';

interface Props {
    replies: StoredReply[];
}

export class ReplyList extends Component<Props> {
    public render() {
        const replies = this.props.replies.length > 0
            ? this.props.replies.map((reply) => <ReplyDisplay key={reply.key} reply={reply} />)
            : <li>No replies</li>;
        return (
            <ol>
                {replies}
            </ol>
        );
    }
}
