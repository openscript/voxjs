import { Component } from 'preact';
import { MenuItem } from './menuItem';

interface Props {
    children: MenuItem[];
}

interface State {
    open: boolean;
}

export class SplitButton extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.setState({open: false});
    }

    public render() {
        return null;
    }
}
