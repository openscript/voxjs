import { Component, h } from 'preact';

interface Props {
    value: string;
}

export class MenuItem extends Component<Props> {
    public render() {
        return <li>{this.props.value}</li>;
    }
}
