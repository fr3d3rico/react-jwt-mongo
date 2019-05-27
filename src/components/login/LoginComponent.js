import React, {useState} from 'react';
import { Redirect } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function Login() {

    const [RegisterPage, setRegisterPage] = useState(false);

    const login = (event) => {
        event.preventDefault();
        console.log('login');
    };
    
    const register = (event) => {
        event.preventDefault();
        console.log('register');
        setRegisterPage(true);
    };

    return (
        <Container>
            {RegisterPage? <Redirect to='/register' />: null}
            <Form>
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

                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <ButtonToolbar>
                    <Button variant="primary" onClick={login}>
                        Login
                    </Button>
                    <Button variant="outline-primary" onClick={register}>
                        Register
                    </Button>
                </ButtonToolbar>
            </Form>
        </Container>
    );
}

export default Login;