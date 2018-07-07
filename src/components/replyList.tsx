import { Component, h } from 'preact';
import { StoredReply } from '../models/reply';
import { ReplyDisplay } from './replyDisplay';

interface Props {
    replies: StoredReply[];
}

export class ReplyList extends Component<Props> {
    public render() {
        const replies = this.props.replies.map((reply) => <ReplyDisplay key={reply.key} reply={reply} />);
        return (
            <ol>
                {replies}
            </ol>
        );
    }
}
