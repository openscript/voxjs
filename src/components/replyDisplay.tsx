import dayjs from 'dayjs';
import { Component, h } from 'preact';
import { StoredReply } from '../models/reply';

interface Props {
    reply: StoredReply;
}

export class ReplyDisplay extends Component<Props> {
    public render() {
        return (
            <li>
                <div class='meta'>
                    <span class='author'>{this.props.reply.author}</span>
                    <span class='datetime'>{dayjs(this.props.reply.created_at).toString()}</span>
                </div>
                {this.props.reply.message}
            </li>
        );
    }
}
