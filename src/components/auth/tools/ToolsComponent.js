import React from 'react';
import { Redirect } from 'react-router';

import Tool from './ToolComponent';

import Container from 'react-bootstrap/Container';

import Cookies from 'universal-cookie';
import axios from 'axios';

class Tools extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                name: '',
                email: '',
                password: '',
                auth: props.auth !== null? props.auth:false
            ,
            msg: {
                type: 'primary',
                msg: ''
            },
            toolList: null
        };

        this.cookies = new Cookies();
    }

    componentWillMount() {
        axios.get('/tools', {
            headers: {
                "x-access-token": this.cookies.get('access_token')
            }
        })
        .then(response => {
            console.log(response.data);

            this.setState({
                toolList: response.data.map(item => {
                    return (<Tool 
                        key={item._id}
                        name={item.name}
                        title={item.title}
                        description={item.description}
                        tags={item.tags} />);
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

    render() {
        // console.log(this.cookies.get('access_token'));

        if( !this.state.auth ) {
            return <Redirect to='/login' />
        }

        return (
        <Container>
            {this.state.toolList}
        </Container>
        );
    }
}

export default Tools;