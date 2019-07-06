import React from 'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Contact from '../contact/Contact';
import Tools from '../tools/ToolsComponent';

import Cookies from 'universal-cookie';
import Logout from '../../login/LogoutComponent';

class Home extends React.Component {

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

        this.cookies = new Cookies();
    }

    componentWillMount() {
        if( this.cookies.get('access_token') ) {
            this.setState({
                auth: true
            });
        }
    }

    render() {

        if( !this.state.auth ) {
            return <Redirect to='/login' />
        }

        return (
        <Container>
            <Tabs defaultActiveKey="tools" id="idTab">
                <Tab eventKey="tools" title="Tools">
                    <Tools auth={this.state.auth} />
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    <Contact />
                </Tab>
                <Tab eventKey="logout" title="Logout">
                    <Logout />
                </Tab>
            </Tabs>
        </Container>
        );
    }
}

export default Home;