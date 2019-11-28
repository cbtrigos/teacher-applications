import React, { Component } from "react";
import {Wrapper, FormWrapper,} from '../../constants/utils/Styling.jsx'
import AppType from './ApplicationPages/AppType.jsx'
import PersonalInfo from './ApplicationPages/PersonalInfo.jsx'
import TeacherInfo from './ApplicationPages/TeacherInfo.jsx'
import ShortAnswer from './ApplicationPages/ShortAnswer.jsx'
import Attachments from './ApplicationPages/Attachments.jsx'
import Submit from './ApplicationPages/Submit.jsx'
import Completed from './ApplicationPages/Completed.jsx'


import styled from "styled-components";
import axios from 'axios';

// not showing any errors :((((()))))
const nassitRegex = RegExp(/^[a-zA-Z]{1}[0-9]{16}$/);
const natIDRegex = RegExp(/^[a-zA-Z0-9]{8}$/);


export default class Application extends Component {
  constructor(props) {
    super(props);
    const user = props.user
    const clearChosen = props.clearChosen
    this.state = {
      step: 0,
      submitOkay:false, 
      missingString: '',
      errors: '',
      checkMark: false, 
      application: {
        application_id: null,
        application_type: null,
        employing_authority:null,
        school_name:null,
        other_names:null,
        nationality: null, 
        prev_appt: null,
        pin_code: null,
        nassit: null,
        qualifications: null,
        special_skills: null,
        created: null,
        last_edited: null,
        submitted: null,
        national_id: '', 
        school_district: '',
        birth_date : (user.birth_date).slice(0,10),
        mobile_number: user.mobile_number, 
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_id: user.user_id,
        sex: user.gender,
      }, 
      formErrors:{
        employing_authority:'',
        school_name:'',
        nationality: '', 
        prev_appt: '',
        pin_code: '',
        nassit: '',
        national_id: '', 
        nassit: ''
      }, 
      toolTip: {
        employing_authority:'Who is the employing authority or management of the school you are employing for? Example: Roman Catholic, Government of Sierra Leone, ..',
        school_name:'Official name of the school you are applying for',
        other_names:'Any other names you go by',
        nationality: 'Your nationality', 
        prev_appt: 'Your previous employment title and location, whether it was as a teacher or not',
        pin_code: "6 digit teacher's pin code",
        nassit: "17 digit National Social Security and Insurance Trust number",
        qualifications: 'Why are you qualified to teach? List and attach any certificate numbers',
        special_skills: "e.g. Special Needs, Music, ..",
        school_district: "select the district where the school you're applying for resides",
        national_id: '8 digit alpha-numeric national identification, granted through the National Civil Registration Authority regardless of citizenship'
      }
};
 }
  async componentDidMount() {
    const app = this.props.application
    if (this.props.application!==undefined) {
      this.setState({
        application: app,
        step:1,
      })
    }
  }

  submit = (event) => {
    const { step } = this.state;
    event.preventDefault();
      axios 
        .post('http://localhost:5000/api/submit-application', 
          {"application_id": this.state.application.application_id
        }) 
        .then(response => {
          if (response.data==="application submitted successfully") {
            this.setState({
              step: step + 1, 
            });
          } 
        })
      
  }

  step = val => e => {
    let k = 0
      if (val==='next') {k=1}
      else if (val==='prev') {k=-1}
      const { step } = this.state;
      this.setState({
        step: step + k
      });
    axios 
    .post('http://localhost:5000/api/save-application', 
      this.state.application) 
    .then(response => {
      if (response.data==="application updated sucessfully") {
        }
    }).catch(error => {
     console.log(error)
  });
  if (val==='exit') {
    this.props.clearChosen()
  }
};

  handleCheckboxChange = name => event => {
    this.setState({ checkMark: event.target.checked })
  }

  beginApp = () => e => {
    axios 
      .post('http://localhost:5000/api/begin-application', 
        {"email": this.state.application.email,
          "sex": this.state.application.sex, 
          "first_name": this.state.application.first_name, 
          "last_name": this.state.application.last_name, 
          "mobile_number": this.state.application.mobile_number,
          "application_type": this.state.application.application_type,
          "user_id": this.props.user.user_id, 
          "birth_date": this.state.application.birth_date
      }) 
      .then(response => {
        if (response.data.message==="application registered sucessfully") {
          const { step } = this.state;
          this.setState(prevState => ({
            step: step + 1, 
            application: {
              ...prevState.application,
              application_id: response.data.application_id,
              created: response.data.created
          }
        })
        );
        }
      })
  };

 
  handleNationalityChange = val =>  {
      this.setState(prevState => ({
        application: {                 
            ...prevState.application, 
            nationality: val  
        }
    }))
    };


  handleChangeSave = input => e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      application: {                 
          ...prevState.application, 
          [input]: value    
      }
  })
  )
  let formErrors = { ...this.state.formErrors };
  switch (input) {
    case "national_id":
      if (value==='') {formErrors.national_id=''}
      else 
        { formErrors.national_id =
          !natIDRegex.test(value)? "Please enter a valid National ID" : ""
          } 
   break;
   case "pin_code":
      formErrors.pin_code =
        (isNaN(value) || value.length!==6)? "Please enter a valid Pin number" : ""     
   break;
   case "nassit":
      if (value==='') {formErrors.nassit=''}
      else 
        { formErrors.nassit =
          !nassitRegex.test(value)? "Please enter a valid Nassit number" : ""
          } 
   break;
}
this.setState({ formErrors, [name]: value });
console.log(this.state)

  }


  validateApplication = () => e=> {
    let valid = true;
    let errors = ''
    let missingString = ''
    const app = this.state.application
    const req = [app.employing_authority, app.national_id, app.nationality, app.school_name, app.school_district]
    const list = [{val:app.other_names, name:'any other names'}, {val:app.pin_code, name:'a pin code'}, {val:app.nassit, name:'a NASSIT number'}, {val:app.qualifications, name:'any qualifications'}, {val:app.special_skills, name:'any special skills'}]
    const emptyFields = []
    list.forEach(
      (i) => {
      if (i['val']===null || i['val']==='') {emptyFields.push(i['name'])}
      })
    if (emptyFields.length!==0) 
      {missingString = emptyFields.join(', ')}
    Object.values(req).forEach((val) => {
      if (val===null) {
        valid = false
        errors ='The following are required: National Identification Number, School Name, School District, Employing Authority, and Nationality.'
      }});
      this.setState({
        errors: errors, 
        missingString: missingString
      })


    return valid;
  }


  render() {
    const { school_district, birth_date, national_id, school_name, prev_appt, nationality, application_type, application_id, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex} = this.state.application;
    const { formErrors, step, errors, missingString, toolTip } = this.state
    const values = { toolTip, formErrors, school_district, birth_date, national_id, school_name, prev_appt, application_id, nationality, application_type, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex, errors, missingString};
    switch (step) {
      case 0: 
        return (
          <AppType 
          beginApp={this.beginApp}
          handleChangeSave={this.handleChangeSave}
          values={values}
          />
        )
      case 1:
        return (
          <PersonalInfo
            step={this.step}
            handleNationalityChange = {this.handleNationalityChange}
            handleChangeSave={this.handleChangeSave}
            values={values}
          />
          );
      case 2:
          return (
            <TeacherInfo
              step={this.step}
              handleChangeSave={this.handleChangeSave}
              values={values}
            />);
      case 3:
        return (
          <ShortAnswer
            step={this.step}
            handleChangeSave={this.handleChangeSave}
            values={values}
          />
        );
      case 4:
          return (
            <Attachments
              step={this.step}
              values={values}
            />);    
      case 5:
        return (
          <Submit
            step={this.step}
            submit = {this.submit}
            validateApplication= {this.validateApplication}
            values={values}
            checkmarked = {this.state.checkMark}
            handleCheckboxChange = {this.handleCheckboxChange}
          />); 
      case 6:
        return (
          <Completed
            values={values}
          />);    
          
          
          }
  }
};




const SideWrapper = styled(Wrapper)`
width: 100%;
display:inline-block;
padding-top: 1%;
margin: 0px;
`

const Menu = styled.div`
display: inline-block;
width: 23%;
text-align: left;
border-radius: 3px;
margin: 1%;
vertical-align: top;
max-width: 100%;
`
const View = styled.div`
display: inline-block;
text-align: left;
width: 74%;
border-radius: 3px;
margin: 1% 1% 0 0 ;
max-width: 100%;
`
const Form = styled(FormWrapper)`
max-width: 100%;`