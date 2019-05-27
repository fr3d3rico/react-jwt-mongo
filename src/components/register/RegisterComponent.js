import React, {useState} from 'react';
import { Redirect } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function Register() {

    const [LoginPage, setLoginPage] = useState(false);

    const register = (event) => {
        event.preventDefault();
        console.log('register');
    };

    const login = (event) => {
        event.preventDefault();
        console.log('login');
        setLoginPage(true);
    };

    return (
        <Container>
            {LoginPage? <Redirect to='/login' />: null}
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <ButtonToolbar>
                    <Button variant="primary" onClick={register}>
                        Register
                    </Button>
                    <Button variant="outline-primary" onClick={login}>
                        Login
                    </Button>
                </ButtonToolbar>
            </Form>
        </Container>
    );
}

export default Register;