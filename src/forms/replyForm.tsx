import { Component, h } from 'preact';
import { MenuItem } from '../components/menuItem';
import { SplitButton } from '../components/splitButton';
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
            <div class='form'>
                <textarea onChange={this.onMessageChange} value={this.state.reply.message} placeholder='Your message' />
                <SplitButton value={submitButtonText} onClick={this.onSubmit}>
                    <MenuItem value='test' />
                </SplitButton>
            </div>
        );
    }

    private onMessageChange(e: Event) {
        const target = e.target as HTMLTextAreaElement;

        this.setState({
            ...this.state,
            reply: {message: target.value}
        });
    }

    private onSubmit() {
        this.props.onSubmit(this.state.reply).then(() => this.setState({reply: defaultReply}));
    }
}
