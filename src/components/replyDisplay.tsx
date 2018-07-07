import dayjs from 'dayjs';
import { Component, h } from 'preact';
import { StoredReply } from '../models/reply';

interface Props {
    reply: StoredReply;
}

export class ReplyDisplay extends Component<Props> {
    public render() {
        const authorPhoto = this.props.reply.authorPhotoURL
            ? <img class='author-photo' src={this.props.reply.authorPhotoURL} />
            : <div class='author-photo default' />;

        return (
            <li id={this.props.reply.key}>
                <div class='header'>
                    {authorPhoto}
                    <div class='meta' >
                        <span class='author'>{this.props.reply.author}</span>
                        <span class='datetime'>{dayjs(this.props.reply.createdAt).toString()}</span>
                    </div>
                </div>
                <div class='message'>
                    {this.props.reply.message}
                </div>
            </li>
        );
    }
}
