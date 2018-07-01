import { Component, h } from 'preact';
import { Reply } from '../models/reply';
import { ReplyForm } from './reply-form';
import { ReplyList } from './reply-list';

export class App extends Component<{}, {}> {

    public render() {
        return (
            <div>
                <ReplyList />
                <ReplyForm onSubmit={this.onReplySubmit} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        alert(reply.message);
    }
}
