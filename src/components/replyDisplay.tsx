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
                <div class='meta' id={this.props.reply.key}>
                    <span class='author'>{this.props.reply.author}</span>
                    <span class='datetime'>{dayjs(this.props.reply.createdAt).toString()}</span>
                </div>
                {this.props.reply.message}
            </li>
        );
    }
}
