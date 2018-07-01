import { Component, h } from 'preact';
import { defaultReply, Reply } from '../models/reply';

interface Props {
    onSubmit: (reply: Reply) => void;
}

interface State {
    reply: Reply;
}

export class ReplyForm extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.setState({reply: defaultReply});

        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Message<textarea onChange={this.onMessageChange} /></label>
                <input type='submit' />
            </form>
        );
    }

    private onMessageChange(e: Event) {
        const target = e.target as HTMLTextAreaElement;

        this.setState({
            ...this.state,
            reply: {message: target.value}
        });
    }

    private onSubmit(e: Event) {
        e.preventDefault();
        this.props.onSubmit(this.state.reply);
    }
}
