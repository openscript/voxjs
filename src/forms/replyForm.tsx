import { Component, h } from 'preact';
import { defaultReply, Reply } from '../models/reply';

interface Props {
    user?: string;
    onSubmit: (reply: Reply) => Promise<void>;
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
        const submitButtonText = this.props.user ? `Submit as ${this.props.user}` : 'Submit';

        return (
            <form onSubmit={this.onSubmit}>
                <label>Message<textarea onChange={this.onMessageChange} value={this.state.reply.message}/></label>
                <input type='submit' value={submitButtonText} />
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
        this.props.onSubmit(this.state.reply).then(() => this.setState({reply: defaultReply}));
    }
}
