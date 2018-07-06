import { Component, h } from 'preact';
import { Reply } from '../models/reply';

interface Props {
    reply: Reply;
}

export class ReplyDisplay extends Component<Props> {
    public render() {
        return <li>{this.props.reply.message}</li>;
    }
}
