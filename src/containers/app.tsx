import 'firebase/database';
import { Component, h } from 'preact';
import { ReplyContainer } from './replyContainer';

export class App extends Component<{}, {}> {
    public render() {
        return (
            <div>
                <ReplyContainer />
            </div>
        );
    }
}
