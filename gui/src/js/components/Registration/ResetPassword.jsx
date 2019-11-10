import React, { Component } from 'react';
import {H1, Wrapper, FormWrapper, Form, Input, CreateButton, A} from '../Styling.jsx'

const loading = {
    margin: '1em',
    fontSize: '24px',
  };

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
        password: '',
        updated: false,
        isLoading: true,
        password2: '',
        messageFromServer: '',
        formErrors: {
            password: '',
            password2:''
        }
    };
  }
  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get('http://localhost:5000/api/reset', {
        params: {
          id: token,
        },
      });
      if (response.data.message === 'password reset link valid') {
        this.setState({
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  updatePassword = async (e) => {
    e.preventDefault();
    const { password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        'http://localhost:5000/api/reset_password',
        {
          password: password,
          id: token,
        },
      );   if (response.data === 'recovery email sent') {
            console.log(this.state.messageFromServer === "recovery email sent")
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
      console.log(response.data);
      if (response.data === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  
  render() {
    const {
 password, error, isLoading, updated 
} = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <A href="/"> Go Home </A>  
            <A href="/forgot-password"> Forgot Password? </A>  
          </div>
        </div>
      );
    }
    else if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    let login =<A href="/login"> logging in </A>;

    return (
      <Wrapper>
      <FormWrapper> 
      <H1>Find your account</H1>
        <Form onSubmit = {this.sendEmail}>
        <Input
          type = "text"
          value = {password}
          id='password'
          onChange={this.handleChange('password') }
          placeholder='New Password'
          />
         <CreateButton type='submit'
         >Update Password</CreateButton> 
        </Form> 
        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try {login}
              again.
            </p>
          </div>
        )}
      </FormWrapper>
    </Wrapper>


    );
  }
}
