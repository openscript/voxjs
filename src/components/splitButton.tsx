import { Component, h } from 'preact';
import { MenuItem } from './menuItem';

interface Props {
    children?: MenuItem[];
    expandOnClick?: boolean;
    onClick: () => void;
    value: string;
}

interface State {
    expanded: boolean;
}

export class SplitButton extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.setState({expanded: false});

        this.onClick = this.onClick.bind(this);
        this.expand = this.expand.bind(this);
    }

    public render() {
        let button = <button onClick={this.onClick}>{this.props.value}</button>;

        if (this.props.expandOnClick) {
            button = <button onClick={this.expand}>{this.props.value}</button>;
        }

        return button;
    }

    private onClick() {
        this.props.onClick();
    }

    private expand() {
        this.setState({expanded: true});
    }
}
