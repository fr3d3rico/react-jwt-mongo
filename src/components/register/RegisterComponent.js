import React, {useState} from 'react';
import { Redirect } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import axios from 'axios';

function Register() {

    const [LoginPage, setLoginPage] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const register = (event) => {
        event.preventDefault();
        if( !userData.name || !userData.email || !userData.password ) {
            console.log('Register: IMPLEMENTAR');
        }
        else {
            axios.post('/register', userData)
            .then(response => {
                console.log(response.data);
            });
        }
    };

    const login = (event) => {
        event.preventDefault();
        setLoginPage(true);
    };

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Container>
            {LoginPage? <Redirect to='/login' />: null}
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter name" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
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