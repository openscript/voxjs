import firebase from 'firebase';
import { Component, h } from 'preact';
import { ReplyContainer } from './replyContainer';

import 'firebase/auth';
import { UserContainer } from './userContainer';

interface State {
    user?: firebase.User;
}

export class App extends Component<{}, State> {
    public componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({...this.state, user});
            }
        });
    }

    public render() {
        return (
            <div>
                <ReplyContainer user={this.state.user} />
                <UserContainer user={this.state.user} />
            </div>
        );
    }
}
