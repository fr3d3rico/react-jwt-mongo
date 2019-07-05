import React from 'react';

import Container from 'react-bootstrap/Container';

class Tool extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        
        return (
        <Container>
            <span>Name: {this.props.name}</span>
            <span>Title: {this.props.title}</span>
            <span>Link: {this.props.link}</span>
            <span>Tags: {this.props.tags}</span>
        </Container>
        );
    }
}

export default Tool;