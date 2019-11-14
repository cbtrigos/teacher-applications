import { Wrapper, FormWrapper, H1} from "../../constants/utils/Styling.jsx";
import React, { Component } from 'react';
import styled from 'styled-components'


export default class AppDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '', 
    };
}
updateView = async event => {
  this.setState({ 
    view: event
  });
}
    render() {
      const view = this.state.view
      switch (view) {
        case 'welcome':
          return (
            <Welcome/>
            );
            }
    }
  }



