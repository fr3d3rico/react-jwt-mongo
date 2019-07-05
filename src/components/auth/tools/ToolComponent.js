import React from 'react';

import Container from 'react-bootstrap/Container';

class Tool extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (<div>
            Name:{this.props.name?this.props.name:''}
            Title:{this.props.title?this.props.title:''}
            Link:{this.props.link?this.props.link:''}
            Tags:{this.props.tags?this.props.tags:''}
            </div>);
    }
}

export default Tool;