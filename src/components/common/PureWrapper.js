import React, { PureComponent, Component } from 'react';

class PureWrapper extends Component {
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            this.props.children
        );
    }
}

export default PureWrapper;
