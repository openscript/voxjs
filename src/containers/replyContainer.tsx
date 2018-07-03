import firebase from 'firebase/app';
import { Component, h } from 'preact';
import { ReplyForm } from '../components/replyForm';
import { ReplyList } from '../components/replyList';
import { Reply } from '../models/reply';

import 'firebase/auth';
import 'firebase/database';

interface Props {
    user?: firebase.User;
}

interface State {
    replys: Reply[];
}

export class ReplyContainer extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

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
    }

    public render() {
        let displayName;
        if (this.props.user) {
            displayName = this.props.user.displayName ? this.props.user.displayName : undefined;
        }
        return (
            <div>
                <ReplyList replys={this.state.replys} />
                <ReplyForm onSubmit={this.onReplySubmit} user={displayName} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        if (this.props.user) {
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
