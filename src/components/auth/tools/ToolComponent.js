import React from 'react';

import Container from 'react-bootstrap/Container';

class Tool extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (<div>
            Title:{this.props.title?this.props.title:''}
            Link:{this.props.link?this.props.link:''}
            Description:{this.props.name?this.props.description:''}
            Tags:{this.props.tags?this.props.tags:''}
            </div>);
    }
}

export default Tool;