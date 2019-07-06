import React from 'react';
import Container from 'react-bootstrap/Container';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            auth: props.auth !== null? props.auth:false,
            msg: {
                type: 'primary',
                msg: ''
            }
        };

    }

    render() {
        return (
            <Container>
                Hi, Fred! (https://github.com/fr3d3rico)
                <br />
                Linkedin: https://www.linkedin.com/in/fasoares
            </Container>
        );
    }
}

export default Contact;