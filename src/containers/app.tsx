import firebase from 'firebase/app';
import { Component, h } from 'preact';
import { ReplyContainer } from './replyContainer';
import { UserContainer } from './userContainer';

import 'firebase/auth';

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
