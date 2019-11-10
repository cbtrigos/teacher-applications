import React, { Component } from "react";
import styled from 'styled-components'

export default class Contact extends Component {
  render() {
    return (
      <Page>
      <h2>
          Contact Page
      </h2>
      </Page>
    );
  }
}


const Page = styled.div`
  background: rgb(37,142,160);
  background: linear-gradient(0deg, rgba(37,142,160,1) 35%, rgba(129,121,144,1) 100%);
  height: 100vh;
`
