import React from 'react';
import Container from 'react-bootstrap/Container';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: {
                name: '',
                email: '',
                password: '',
                auth: props.auth !== null? props.auth:false
            ,// },
            msg: {
                type: 'primary',
                msg: ''
            }
        };

    }

    render() {
        return (
            <Container>
                Contact Component
            </Container>
        );
    }
}

export default Contact;