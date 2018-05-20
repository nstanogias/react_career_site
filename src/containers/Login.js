import React, {Component} from 'react';
import {Container, Form} from 'semantic-ui-react';

class Login extends Component {

  state = {
    email:'',
    password:'',
    error:'',
    success:false
  };

  handleInputEmail = (e) => {
    this.setState({email:e.target.value})
  };

  handleInputPassword = (e) => {
    this.setState({password:e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input fluid label='Email' placeholder='Email'/>
          <Form.Input fluid lable='Password' placeholder='Password'/>
          <Form.Button>Login</Form.Button>
        </Form>
      </Container>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


