import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

    handleClick = () => {
        window.open('https://www.linkedin.com/in/fasoares', '_blank');
    }

    render() {
        return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://avatars0.githubusercontent.com/u/1296366?s=460&v=4" />
                    <Card.Body>
                        <Card.Title>Hi, Fred! (https://github.com/fr3d3rico)</Card.Title>
                        <Card.Text>
                        LinkedIn: https://www.linkedin.com/in/fasoares
                        </Card.Text>
                        <Button variant="primary" onClick={this.handleClick}>Go to LinkedIn</Button>
                    </Card.Body>
                </Card>
        );
    }
}

export default Contact;