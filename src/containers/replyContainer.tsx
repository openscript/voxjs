import firebase from 'firebase';
import { Component, h } from 'preact';
import { ReplyForm } from '../components/replyForm';
import { ReplyList } from '../components/replyList';
import { Reply } from '../models/reply';

interface State {
    replys: Reply[];
}

export class ReplyContianer extends Component<{}, State> {
    public constructor() {
        super();

        this.setState({replys: []});
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
        return (
            <div>
                <ReplyList replys={this.state.replys} />
                <ReplyForm onSubmit={this.onReplySubmit} />
            </div>
        );
    }

    private onReplySubmit(reply: Reply) {
        firebase.database().ref('replys').push().set(reply);
    }
}
