import React, { Component } from "react";
import {FormWrapper, Field, Wrapper, H1, H2,HorizSeparator, CreateButton, Buttons, Left, Clearlink} from "../../constants/utils/Styling.jsx"
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
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
    "school_type",
    "district",
    "title_proposed_appt",
    'grade_requested',
    "qualifications_required"
  ]
};
const AllOpenings = (props) => {
    const openings = props.openings
    const data = {
      columns: [
        {
          label: 'Opening ID',
          field: 'opening_key',
          sort: 'asc',
          width: 150
        },
        {
          label: 'School Name',
          field: 'school',
          sort: 'asc',
          width: 150
        },
        {
            label: 'EMIS code',
            field: 'emis_code',
            sort: 'asc',
            width: 150
          },
        {
            label: 'Type',
            field: 'school_type',
            sort: 'asc',
            width: 200
          },
        {
          label: 'District',
          field: 'district',
          sort: 'asc',
          width: 270
        },

        {
          label: 'Opening',
          field: 'title_proposed_appt',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Grade',
          field: 'grade_requested',
          sort: 'asc',
          width: 100
        },
        {
            label: 'Qualifications',
            field: 'qualifications_required',
            sort: 'asc',
            width: 100
          },
      ],
      rows:openings 
    };
  
    return (
    
      <MDBDataTable
        color="primary-color"      
        responsive
        striped
        bordered
        small
        searching={false}
        paging={false}
        data={data}
      />
    );
  }


export default class Openings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOpenings: [],
      listedOpenings: []
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
            listedOpenings: response.data.openings,
            allOpenings: response.data.openings
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
         



    render() {
      const jobOpenings = <AllOpenings openings={this.state.listedOpenings}/>
          return (
              <Wrapper>
              <FormWrapper>
                  <H1>Current Job Openings</H1>
                  <H2>The following are the current job openings for primary, secondary, and vocational public school positions here in Sierra Leone. Please make an account if you wish to apply to one of these positions. <br/><br/>
                  <Buttons>
                    <Left>
                    <Clearlink href="http://educationdatahub.dsti.gov.sl" style={{width:'50%'}}>
                      <CreateButton tall>
                        Looking for more school information?
                      </CreateButton>
                      </Clearlink>
                    </Left>
                    <Clearlink href="/new-job-opening" style={{width:'100%'}}>
                    <CreateButton tall>
                        Are you a school proprietor looking to create a new listing?
                      </CreateButton>
                    </Clearlink>
                  </Buttons>

                   </H2>
                  <HorizSeparator/>

                  <br/>
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
                  {jobOpenings}

              </FormWrapper>
              </Wrapper>
              );

      };
};
