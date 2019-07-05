import React from 'react';
import { Redirect } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import Home from '../auth/home/HomeComponent';

import Cookies from 'universal-cookie';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            auth: false,
            msg: {
                type: 'primary',
                msg: ''
            },
            RegisterPage: false
        };

        this.cookies = new Cookies();
    }

    login = (event) => {
        event.preventDefault();

        if( !this.state.email || !this.state.password ) {
            this.setState({
                ...this.state,
                msg: {
                    type: 'danger',
                    msg: 'Loggin error! Please, try again.'
                }
            });
        }
        else {
            const postData = {
                email: this.state.email,
                password: this.state.password
            };
    
            axios.post('/login', postData)
            .then(response => {
                this.setState({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    access_token: response.data.access_token,
                    expires_in: response.data.expires_in,
                    auth: true,
                    msg: {
                        type: 'success',
                        msg: 'Hey '+ response.data.user.name +', you logged success!'
                    }
                }, () => {
                    this.cookies.set('access_token', response.data.access_token);
                    // this.props.history.replace( '/home' );
                });
                
            })
            .catch(err => {
                //console.log('ERROR: ' + err);
                this.setState({
                    msg: {
                        type: 'danger',
                        msg: 'Loggin error! Please, try again.' + err
                    }
                });
            });
        }
        
    }
    
    register = (event) => {
        event.preventDefault();
        this.setState({
            RegisterPage: true
        });
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        }, () => {
            // console.log(this.state);
        })
    }

    render() {

        if( this.state.auth ) {
            return <Home auth={this.state.auth}/>;
        }

        return (
        <Container>
            {this.state.RegisterPage? <Redirect to='/register' />: null}
            {this.state.msg.msg.length > 0?<Alert variant={this.state.msg.type}>{this.state.msg.msg}</Alert>:''}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <ButtonToolbar>
                    <Button variant="primary" onClick={this.login}>
                        Login
                    </Button>
                    <Button variant="outline-primary" onClick={this.register}>
                        Register
                    </Button>
                </ButtonToolbar>
            </Form>
        </Container>);
    }
}

export default Login;