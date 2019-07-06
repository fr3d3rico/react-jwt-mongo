import React from 'react';
import { Router } from 'react-router';

import Button from 'react-bootstrap/Button';

import Cookies from 'universal-cookie';

class Logout extends React.Component {

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

    handleLogout = (event) => {
        event.preventDefault();
        this.setState({
            auth: false
        }, () => {
            this.cookies.remove('access_token');
            Router.push('/login');
        });
    }

    render() {
        return (
            <Button variant="warning" onClick={this.handleLogout}>
                Logout
            </Button>
        );
    }
}

export default Logout;