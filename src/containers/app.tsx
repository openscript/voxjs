import firebase from 'firebase/app';
import { Component, h } from 'preact';
import { Reply } from '../models/reply';
import { ReplyForm } from './reply-form';
import { ReplyList } from './reply-list';

import 'firebase/database';

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
        firebase.database().ref('replys').push().set(reply);
    }
}
