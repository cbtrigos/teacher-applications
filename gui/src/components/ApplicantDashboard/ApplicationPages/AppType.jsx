import React, { Component } from "react";
import {H1, H2, Field, Buttons, Wrapper, HorizSeparator, Left, WideButton,  FormWrapper, CreateButton, A_center} from '../../../constants/utils/Styling.jsx'
import axios from 'axios';
import Opening from './OpeningsSearch.jsx'
import Fuse from "fuse.js";

var searchOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "emis_code",
    "school",
    "grade",
    "qualifications_required"
  ]
};


export default class AppType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      allOpenings: [],
      listedOpenings: [],
      selected: ''
  }
}

async componentDidMount() {
  axios 
  .get('http://localhost:5000/api/get-job-openings') 
  .then(response => {
  if (response.data==="error in getting openings") {
      throw new Error("Error in pulling openings") } 
  else {
      this.setState({ 
      allOpenings: response.data.openings,
      listedOpenings: response.data.openings
      });
  }
  })
}

  handleChange = input => e => {
    var fuse = new Fuse(this.state.allOpenings, searchOptions); // "list" is the item array
    const value = e.target.value
    if (value !==''){
      let results = fuse.search(value)
      this.setState({
        listedOpenings: results
      })
    }
    else 
    this.setState({
      listedOpenings: this.state.allOpenings
    })
  }
      

  
  selectApp = (selectedOpening) => e => {
    this.setState({
      selected: selectedOpening
    })
  }
  render() {
    const drafts = this.state.listedOpenings.map(item => 
      <Opening opening={item} key = {item.opening_id}  beginApp = {this.props.beginApp}/>
      );

        return ( 
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
             <H2>Which job opening would you like to apply to?</H2>
             <H2 tiny> <A_center H2 href="/openings">You can explore the current job teacher job openings here</A_center></H2>
            <HorizSeparator/>
                <form>
                <Field
                    type = "text"
                    name="search"
                    noValidate
                    placeholder="Filter by any of the listed fields.."
                    onChange={this.handleChange('search')}
                    defaultValue={this.state.search}
                    />
                </form>
             {drafts}
                <br/> <br/> 
            </FormWrapper>
            </Wrapper>

            );

    };
};