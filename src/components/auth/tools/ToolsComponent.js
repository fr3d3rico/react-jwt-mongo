import React from 'react';
import { Redirect } from 'react-router';

import Tool from './ToolComponent';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Cookies from 'universal-cookie';
import axios from 'axios';

class Tools extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            auth: props.auth !== null ? props.auth : false
            ,
            msg: {
                type: 'primary',
                msg: ''
            },
            toolList: null,
            show: false
        };

        this.cookies = new Cookies();
    }

    search = () => {
        axios.get('/tools', {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            console.log(response.data);

            this.setState({
                toolList: response.data.map((item, index) => {

                    return (
                        <tr key={index}>
                            <Tool
                                key={item._id}
                                name={item.name}
                                title={item.title}
                                description={item.description}
                                tags={item.tags} />
                            <Button variant="secondary" onClick={this.handleShow}>
                                Remove?
                            </Button>
                        </tr>
                    );
                })
            });
        })
        .catch(err => {
            this.setState({
                msg: {
                    type: 'danger',
                    msg: 'Error while trying retrieve all Tools items.' + err
                }
            });
        });
    }

    componentWillMount() {
        this.search();
    }

    handleSearch = (event) => {
        event.preventDefault();
        this.search();
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleRemove = (event) => {
        event.preventDefault();

        axios.delete('/tools', {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            console.log(response.data);

            this.setState({
                toolList: response.data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <Tool
                                key={item._id}
                                name={item.name}
                                title={item.title}
                                description={item.description}
                                tags={item.tags} />
                            <Button variant="secondary" onClick={this.handleShow}>
                                Remove?
                            </Button>
                        </tr>
                    );
                })
            });
        })
        .catch(err => {
            this.setState({
                msg: {
                    type: 'danger',
                    msg: 'Error while trying remove Tool item.' + err
                }
            });
        });
    }

    render() {
        // console.log(this.cookies.get('access_token'));

        if (!this.state.auth) {
            return <Redirect to='/login' />
        }

        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        Tools
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button variant="primary">+</Button>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Tag Name" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={this.handleSearch}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Table responsive="sm">
                    <thead><th>Tools</th></thead>
                    <tbody>
                        {this.state.toolList}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleRemove}>
                            Remove Item
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Tools;