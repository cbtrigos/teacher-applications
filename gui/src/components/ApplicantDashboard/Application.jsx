import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import AppType from './ApplicationPages/AppType.jsx'
import PersonalInfo from './ApplicationPages/PersonalInfo.jsx'
import TeacherInfo from './ApplicationPages/TeacherInfo.jsx'
import ShortAnswer from './ApplicationPages/ShortAnswer.jsx'
import Attachments from './ApplicationPages/Attachments.jsx'
import Submit from './ApplicationPages/Submit.jsx'
import Completed from './ApplicationPages/Completed.jsx'
import axios from 'axios';

// not showing any errors :((((()))))
const nassitRegex = RegExp(/^[a-zA-Z]{1}[0-9]{16}$/);
const natIDRegex = RegExp(/^[a-zA-Z0-9]{8}$/);


class Application extends Component {
  constructor(props) {
    super(props);
    const user = props.user
    const clearChosen = props.clearChosen
    this.state = {
      step: 0,
      submitOkay:false, 
      loading: '',
      missingString: '',
      errors: '',
      checkMark: false, 
      serverMessage: '',
      bannedOpening: '',
      application: {
        application_id: null,
        job_opening: '',
        job_title: '',
        school_name:'',
        other_names:'',
        nationality: '', 
        prev_appt: '',
        pin_code: '',
        nassit: '',
        files: [],
        qualifications: '',
        special_skills: '',
        certificates: '',
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
        school_name:'',
        nationality: '', 
        prev_appt: '',
        pin_code: '',
        nassit: '',
        national_id: '', 
        nassit: ''
      }, 
      toolTip: {
        qualifications: 'Select your qualifified schooling level from the following list',
        school_name:'Official name of the school you are applying for',
        other_names:'Any other names you go by',
        nationality: 'Your nationality', 
        prev_appt: 'Your previous employment title and location, whether it was as a teacher or not',
        pin_code: "6 digit teacher's pin code",
        nassit: "17 digit National Social Security and Insurance Trust number",
        certificates: 'Please list the certificate numbers + associated schools to verify your above qualification ',
        special_skills: "e.g. Special Needs, Music, ..",
        school_district: "the district where the school you're applying for resides",
        national_id: '8 digit alpha-numeric national identification, granted through the National Civil Registration Authority regardless of citizenship'
      }
};

this.beginApp=this.beginApp.bind(this);

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
    this.setState({
      loading: 'loading', 
    });
      axios 
        .post('http://localhost:5000/api/submit-application', 
          {"application": this.state.application,
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
    if (this.props.clearChosen!==undefined) {
      this.props.clearChosen()
    }
    else {
      this.props.history.push("/dashboard")    
    }
  }
};

  handleCheckboxChange = name => event => {
    this.setState({ checkMark: event.target.checked })
  }

  beginApp = (opening) => e => {
    axios 
      .post('http://localhost:5000/api/begin-application', 
        {"email": this.state.application.email,
          "sex": this.state.application.sex, 
          "first_name": this.state.application.first_name, 
          "last_name": this.state.application.last_name, 
          "mobile_number": this.state.application.mobile_number,
          "job_opening": opening.opening_key,
          "job_title": opening.title_proposed_appt,
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
              job_opening: opening.opening_key,
              job_title: opening.title_proposed_appt,
              created: response.data.created,
              school_name: opening.school,
              title_proposed_appt: opening.title_proposed_appt,
              school_district: opening.district
          }
        })
        );
        }
      else {
        this.setState({
          serverMessage: response.data,
          bannedOpening: opening.opening_key
        })
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
  }

  attachFiles = files => e => {
    this.setState(prevState => ({
      application: {                 
          ...prevState.application, 
          files: files
      }
  }))

  } 
  validateApplication = HEHE => e => {
    console.log('IN THE VALIDATE', this.state)
    let valid = true;
    let errors = ''
    let missingString = ''
    const app = this.state.application
    const req = [ app.national_id, app.nationality, app.school_name, app.school_district]
    const list = [{val:app.other_names, name:'any other names'}, {val:app.pin_code, name:'a pin code'}, {val:app.nassit, name:'a NASSIT number'}, {val:app.qualifications, name:'any qualifications'}, {val:app.special_skills, name:'any special skills'}]
    const emptyFields = []
    list.forEach(
      (i) => {
      if (i['val']===null || i['val']==='') {emptyFields.push(i['name'])}
      })
    if (emptyFields.length!==0) 
      {missingString = emptyFields.join(', ')}
    Object.values(req).forEach((val) => {
      console.log(val)
      if (val===null || val==='') {
        valid = false
        errors ='The following are required: National Identification Number, School Name, School District, and Nationality.'
      }});
      this.setState({
        errors: errors, 
        missingString: missingString
      })


    return valid;
  }


  render() {
    const {job_title,  title_proposed_appt, certificates, school_district, birth_date, national_id, school_name, prev_appt, nationality, job_opening, application_id, last_name, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex} = this.state.application;
    const { loading, formErrors, step, errors, missingString, toolTip, serverMessage, bannedOpening } = this.state
    const values = {job_title, loading, title_proposed_appt, certificates, toolTip, formErrors, school_district, birth_date, national_id, school_name, prev_appt, application_id, nationality, job_opening, last_name, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex, errors, missingString};
    switch (step) {
      case 0: 
        return (
          <AppType 
          beginApp={this.beginApp}
          handleChangeSave={this.handleChangeSave}
          values={values}
          serverMessage= {serverMessage}
          bannedOpening = {bannedOpening}
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
              attachFiles = {this.attachFiles}
              handleChangeSave={this.handleChangeSave}

            />);    
      case 5:
        return (
          <Submit
            step={this.step}
            submit = {this.submit}
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

export default withRouter(Application);



// const SideWrapper = styled(Wrapper)`
// width: 100%;
// display:inline-block;
// padding-top: 1%;
// margin: 0px;
// `

// const Menu = styled.div`
// display: inline-block;
// width: 23%;
// text-align: left;
// border-radius: 3px;
// margin: 1%;
// vertical-align: top;
// max-width: 100%;
// `
// const View = styled.div`
// display: inline-block;
// text-align: left;
// width: 74%;
// border-radius: 3px;
// margin: 1% 1% 0 0 ;
// max-width: 100%;
// `
// const Form = styled(FormWrapper)`
// max-width: 100%;`