import firebase from 'firebase/app';
import { Component, h } from 'preact';

import 'firebase/auth';

interface Props {
    user?: firebase.User;
}

export class UserContainer extends Component<Props> {
    public render() {
        return (
            <div>
                {this.props.user ? this.props.user.displayName : null}
            </div>
        );
    }
}
