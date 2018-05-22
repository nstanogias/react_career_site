import React, {Component} from 'react';
import {Container, Form} from 'semantic-ui-react';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';

class Login extends Component {

  state = {
    email:'',
    password:''
  };

  handleInputEmail = (e) => {
    this.setState({email:e.target.value})
  };

  handleInputPassword = (e) => {
    this.setState({password:e.target.value})
  };

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.user.login.isAuth){
  //     this.props.history.push('/user')
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password)
  };

  render() {
    let user = this.props.user;
    return (
      <div>
      <Container>
        <h2>Log in here</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input fluid label='Email' placeholder='Enter your email' onChange={this.handleInputEmail}/>
          <Form.Input fluid label='Password' type='password' placeholder='Enter your password' onChange={this.handleInputPassword}/>
          <Form.Button>Log in</Form.Button>
        </Form>
      </Container>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(actions.loginUser(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


