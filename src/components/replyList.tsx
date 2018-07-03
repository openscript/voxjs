import { Component, h } from 'preact';
import { Reply } from '../models/reply';

interface Props {
    replys: Reply[];
}

export class ReplyList extends Component<Props> {
    public render() {
        const replys = this.props.replys.map((reply) => <li key={reply.message}>{reply.message}</li>);
        return (
            <ol>
                {replys}
            </ol>
        );
    }
}
