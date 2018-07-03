import firebase from 'firebase/app';
import { Component, h } from 'preact';
import { ReplyForm } from '../components/replyForm';
import { ReplyList } from '../components/replyList';
import { Reply } from '../models/reply';

import 'firebase/auth';
import 'firebase/database';

interface State {
    replys: Reply[];
    user?: firebase.User;
}

export class ReplyContainer extends Component<{}, State> {
    public constructor() {
        super();

        this.setState({replys: []});
        this.onReplySubmit = this.onReplySubmit.bind(this);
    }

    public componentWillMount() {
        firebase.database().ref('replys').on('value', (snapshot) => {
            if (snapshot != null) {
                const replysSnapshot = (snapshot.val() as {[key: string]: Reply});
                const replys = Object.keys(replysSnapshot).map((key) => replysSnapshot[key]);
                this.setState({...this.state, replys});
            }
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({...this.state, user});
            }
        });
    }

    public render() {
        return (
            <div>
                <ReplyList replys={this.state.replys} />
                <ReplyForm onSubmit={this.onReplySubmit} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        if (this.state.user) {
            firebase.database().ref('replys').push().set(reply);
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then((result) => {
                firebase.database().ref('replys').push().set(reply);
            });
        }
    }
}
