import React, { Component } from "react";
import {FormWrapper, Form, Notification, New, Label, Input, InputLarge, CreateButton, Wrapper, H1, ErrorMessage} from "../../constants/utils/Styling.jsx"
import axios from 'axios';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default class Contact extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "", 
      email: "",
      message: "",
      subject: "",
      formErrors: {
        name: "Name is required", 
        subject: "Subject under 50 characters is required", 
        email: "Invalid email address", 
        message: "Message under 300 characters is required"
      },
      submitted: false,
      serverMessage: ''
    };
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);
  }
      formValid = () => {
        let valid = true 
        const formErrors = this.state.formErrors
        for (var error in formErrors) {
          if (formErrors[error] !== '') 
            valid = false}
        return valid 
        };

      handleChange = input => e => {
        const { name, value } = e.target;
        this.setState({[name]: value });
        let formErrors = { ...this.state.formErrors };
        switch (input) {
          case "name":
            formErrors.name =
            value.length < 3 ? "Name is required" : "";
          break;
          case "subject":
            formErrors.subject =
            (value.length < 3 || value.length>50) ? "Subject under 50 characters is required" : "";
          break;
          case "email":
            formErrors.email =
            emailRegex.test(value) ? "" : "Invalid email address";
          break;
          case "message":
            formErrors.message =
            (value.length < 10 || value.length>300) ? "Message between 10-300 characters is required" : "";
          break;
        }
        this.setState({ formErrors, [name]: value });
      };


      handleSubmit = async e => {
        e.preventDefault();
        if (!this.formValid()) {
            this.setState({
              submitted: true
            })
        }
        else {
          this.setState({
            serverMessage: 'loading..'
          })
          axios 
          .post('http://localhost:5000/api/outside-contact', 
            {"email": this.state.email,
             "name": this.state.name,
             "message": this.state.message, 
             "subject": this.state.subject 
          }) 
          .then(response => {
            this.setState({
              serverMessage: response.data
            })
          })
      }
      };


    render() {
      const {formErrors, submitted, serverMessage} = this.state
          return (
              <Wrapper>
              <FormWrapper>
                  <H1>Contact Us!</H1>

                  {serverMessage!=='' && <Notification>{serverMessage}</Notification>}

                  <Form onSubmit = {this.handleSubmit} noValidate>
                  <New>
                      <Label htmlFor="name">Name </Label>
                      <Input
                          type = "text"
                          name="name"
                          // placeholder="Name"
                          noValidate
                          onChange={this.handleChange('name')}
                          />
                  {(formErrors.name!=='' && submitted) && <ErrorMessage>{formErrors.name}</ErrorMessage>}
                  </New>
                  <New>
                      <Label htmlFor="email"> Email</Label>
                      <Input
                          className=""
                          type="email"
                          name="email"
                          // placeholder="Email"
                          noValidate
                          onChange={this.handleChange('email')}
                          />
                  {(formErrors.email!=='' && submitted) && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                  </New>
                  <New>
                      <Label htmlFor="subject"> Subject</Label>
                      <Input
                          className=""
                          type="subject"
                          name="subject"
                          // placeholder="Subject"
                          noValidate
                          onChange={this.handleChange('subject')}
                          />
                  {(formErrors.subject!=='' && submitted) && <ErrorMessage>{formErrors.subject}</ErrorMessage>}

                  </New>
                  <New>
                      <Label htmlFor="message"> Message</Label>
                      <InputLarge
                          className=""
                          type="Input"
                          rows="5"
                          name="message"
                          // placeholder="message"
                          noValidate
                          onChange={this.handleChange('message')}
                          />
                  {(formErrors.message!=='' && submitted) && <ErrorMessage>{formErrors.message}</ErrorMessage>}
                  </New>
                  <CreateButton type="submit">Send Email</CreateButton>
                  </Form>
              </FormWrapper>
              </Wrapper>
              );

      };
};
