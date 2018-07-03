import 'firebase/database';
import { Component, h } from 'preact';
import { ReplyContianer } from './replyContainer';

export class App extends Component<{}, {}> {
    public render() {
        return (
            <div>
                <ReplyContianer />
            </div>
        );
    }
}
