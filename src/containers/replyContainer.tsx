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
    loading: boolean;
}

export class ReplyContainer extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.setState({replies: [], loading: true});
        this.onReplySubmit = this.onReplySubmit.bind(this);
    }

    public componentWillMount() {
        firebase.database().ref('/replies').child(btoa(window.location.pathname)).on('value', (snapshot) => {
            if (snapshot !== null) {
                const replysSnapshot = (snapshot.val() as {[key: string]: Exclude<StoredReply, 'key'>});
                if (replysSnapshot !== null) {
                    const replies = Object.keys(replysSnapshot).map((key) => {
                        return {...replysSnapshot[key], key};
                    });
                    this.setState({...this.state, replies});
                }
            }
            this.setState({...this.state, loading: false});
        });
    }

    public render() {
        let displayName;
        if (this.props.user) {
            displayName = this.props.user.displayName ? this.props.user.displayName : undefined;
        }
        const replylist = this.state.loading ? <span>Loading ...</span> : <ReplyList replies={this.state.replies} />;
        return (
            <div>
                {replylist}
                <ReplyForm onSubmit={this.onReplySubmit} user={displayName} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        return new Promise<void>((resolve, reject) => {
            if (this.props.user) {
                this.pushReply(reply);
                resolve();
            } else {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithRedirect(provider);
                firebase.auth().getRedirectResult().then(() => {
                    this.pushReply(reply);
                    resolve();
                }).catch(() => reject());
            }
        });
    }

    private pushReply(reply: Reply) {
        firebase.database().ref('/replies').child(btoa(window.location.pathname)).push().set(reply);
    }
}
