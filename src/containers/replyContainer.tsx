import firebase from 'firebase/app';
import { Component, h } from 'preact';
import { ReplyList } from '../components/replyList';
import { ReplyForm } from '../forms/replyForm';
import { Reply, StoredReply } from '../models/reply';

import 'firebase/auth';
import 'firebase/database';

interface Props {
    user?: firebase.User;
}

interface State {
    replies: StoredReply[];
}

export class ReplyContainer extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.setState({replies: []});
        this.onReplySubmit = this.onReplySubmit.bind(this);
    }

    public componentWillMount() {
        firebase.database().ref('/replies').on('value', (snapshot) => {
            if (snapshot != null) {
                const replysSnapshot = (snapshot.val() as {[key: string]: Exclude<StoredReply, 'key'>});
                const replies = Object.keys(replysSnapshot).map((key) => {
                    return {...replysSnapshot[key], key};
                });
                this.setState({...this.state, replies});
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
                <ReplyList replies={this.state.replies} />
                <ReplyForm onSubmit={this.onReplySubmit} user={displayName} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        if (this.props.user) {
            this.pushReply(reply);
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(() => {
                this.pushReply(reply);
            });
        }
    }

    private pushReply(reply: Reply) {
        firebase.database().ref('/replies').push().set(reply);
    }
}
