import React from 'react';
import { Redirect } from 'react-router';

import Tool from './ToolComponent';

import Alert from 'react-bootstrap/Alert';
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
            show: false,
            showForm: false,
            itemTarget: null,
            textSearch: null,
            newtitle: '',
            newlink: '',
            newdescription: '',
            newtags: ['']
        };

        this.cookies = new Cookies();
    }

    handleChange = (event) => {
        
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        }, () => {
            // console.log(this.state.textSearch);
            // console.log(this.state);
        })
    }

    search = (tag, callback) => {

        let url = '/tools';
        if(tag) {
            url += `?tag=${tag}`;
        }

        axios.get(url, {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            console.log(response.data);

            this.setState({
                toolList: response.data.map((item, index) => {

                    return (
                        <tr>
                            <Tool
                                key={index}
                                title={item.title}
                                link={item.link}
                                description={item.description}
                                tags={item.tags} />
                            <Button variant="secondary" onClick={(event) => this.handleShow(event, item._id)}>
                                Remove?
                            </Button>
                        </tr>
                    );
                })
            }, () => {
                callback();
            });
        })
        .catch(err => {
            this.setState({
                msg: {
                    type: 'danger',
                    msg: 'Error while trying retrieve all Tools items.' + err
                }
            });
        })
        .then(() => {
            this.handleClose();
        });
    }

    componentWillMount() {
        this.search('', () => {});
    }

    handleSearch = (event) => {
        event.preventDefault();
        if( this.state.textSearch ) {
            this.search(this.state.textSearch, () => {});
        }
        else {
            this.search('', () => {});
        }
    }

    handleSave = (event) => {
        event.preventDefault();

        axios.post('/tools', {
            title: this.state.newtitle,
            link: this.state.newlink,
            description: this.state.newdescription,
            tags: [this.state.newtags]
        }, {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            //console.log(response.data);

            this.search('', () => {
                this.setState({
                    msg: {
                        type: 'success',
                        msg: 'New Tool item saved!'
                    }
                });
            });
        })
        .catch(err => {
            this.setState({
                msg: {
                    type: 'danger',
                    msg: 'Error while trying remove Tool item.' + err
                }
            });
        })
        .then(() => {
            this.handleClose();
        });
    }

    handleClose = () => {
        this.setState({ show: false, showForm: false, itemTarget: null });
    }

    handleShow = (event, id) => {
        this.setState({ show: true, showForm: false, itemTarget: id });
    }

    handleShowForm = (event, id) => {
        this.setState({ show: false, showForm: true });
    }

    handleRemove = (event, id) => {
        event.preventDefault();

        console.log(id);

        axios.delete(`/tools/${id}`, {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            //console.log(response.data);

            this.search('', () => {
                this.setState({
                    msg: {
                        type: 'success',
                        msg: 'Tool item removed!'
                    }
                });
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
                {this.state.msg.msg.length > 0?<Alert variant={this.state.msg.type}>{this.state.msg.msg}</Alert>:''}
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        Tools
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button variant="primary" onClick={this.handleShowForm}>+</Button>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" name="textSearch" placeholder="Tag Name" className="mr-sm-2" onChange={this.handleChange}/>
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
                        <Modal.Title>Save new Tool</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Item id: {this.state.itemTarget}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={(event) => this.handleRemove(event, this.state.itemTarget)}>
                            Remove Item
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showForm} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you Sure about remove this item?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="newtitle" placeholder="Enter title" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicLink">
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="text" name="newlink" placeholder="Enter link" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="textarea" name="newdescription" placeholder="Enter description" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicTags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" name="newtags" placeholder="Enter tags" onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Tools;