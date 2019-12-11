import React, { Component } from "react";
import {H2, H1, Application, Buttons, CreateButton, Partition, ErrorMessage, Field, Bucket,  Input,  Left} from '../../../constants/utils/Styling.jsx'



export default class Approver2Form extends Component {
  constructor(props) {
    super(props);
    const user = props.user
    this.state = {
     checkmark: false, 
      submitOkay:false, 
      approval: {
        approver_id: user.user_id, 
        applicant_id: props.application.user_id,
        application_id: props.application.application_id, 
        approver_2_name: user.first_name + ' ' + user.last_name, 
        signed: 'yes'
      }, 
      
};
 }


 handleChangeSave = input => e => {
  const value = e.target.value
  this.setState(prevState => ({
    approval: {                 
        ...prevState.approval, 
        [input]: value    
    }
  }))
  }
  handleCheckboxChange = name => event => {
    this.setState({ checkmark: event.target.checked })
  }


  render() {
    const { application, user, approveApplication } = this.props;
    const { approval } = this.state
    const appdate = application.approver_1_decision
    // const propAppt = application.date_proposed_appt
    // const birth = user.birth_date
    const approver_1_decision = appdate.slice(8,10) +'/'+ appdate.slice(5,7) + '/' + appdate.slice(0,4)
    // const birth_date = birth.slice(8,10)+'/' +birth.slice(5,7) +'/' + birth.slice(0,4)
    // const proposed_appt_date = propAppt.slice(8,10) +'/'+ propAppt.slice(5,7) + '/' + propAppt.slice(0,4)
    const t = new Date()
    const today = t.getDate() + '/' +t.getMonth() +'/' +t.getFullYear()
        return (
          <Application>
          <Partition>
          <H1 style={{marginBottom:'0%'}}>Reviewal by {application.approver_1_name}</H1>
          <H2 style={{marginTop:'13px'}}>as a TSC Teacher Management Department Representative</H2>
          <Bucket>
                <H2 label left htmlFor="basic_yearly_salary">Basic Yearly Salary </H2>
                <Field 
                    type = "text"
                    name="basic_yearly_salary"
                    noValidate
                    disabled={true}
                    defaultValue={application.basic_yearly_salary}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="basic_monthly_salary">Basic Monthly Salary </H2>
                <Field 
                    type = "text"
                    name="basic_monthly_salary"
                    noValidate
                    disabled={true}
                    defaultValue={application.basic_monthly_salary}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="mobile_number"> Reviewer Full Name</H2>
                <Field 
                    type = "text"
                    name="mobile_number"
                    noValidate
                    disabled={true}
                    defaultValue={application.approver_1_name}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="approver_1_name">Reviewer Email </H2>
                <Field 
                    type = "text"
                    name="approver_1_name"
                    disabled={true}
                    noValidate
                    defaultValue={application.approver_1_email}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date">Reviewed on</H2>
                <Field
                    name="date"
                    noValidate
                    disabled= {true}
                    defaultValue={approver_1_decision}
                    />
          </Bucket>
          </Partition>
          <Partition>
          <H1 style={{marginBottom:'0%'}}>Your Approval for #{application.application_id} </H1>
          <H2 style={{marginTop:'13px'}}>as TSC Chair</H2>
          {/* <Bucket> */}
          <div style={{width:'85%'}}>
                <H2 label left htmlFor="approver_2_name">Approver Name *</H2>
                <Input
                    type = "text"
                    name="approver_2_name"
                    onChange={this.handleChangeSave('approver_2_name')}
                    disabled= {true}
                    style={{textAlign:'center'}}
                    defaultValue={approval.approver_2_name}
                    />
                <H2 label left htmlFor="date">Signature *</H2>
                <Input
                  defaultValue = {`${user.first_name} ${user.last_name}`}
                  disabled={true}
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    fontWeight: 'light',
                    textAlign: 'center',
                    fontSize: '20pt',
                    height: '40px'
                  }}
                  />
                <H2 label left htmlFor="date">Date*</H2>
                <Input
                    name="date"
                    noValidate
                    style={{textAlign:'center'}}
                    disabled= {true}
                    defaultValue={today}
                    />
              <br/><br/>
          </div>
          </Partition>
          <br/>
          <Buttons >
                <Left style={{minWidth: '2%', width: '4%'}}>
                    <Input 
                    type="checkbox"
                    checked={this.state.checkmark}
                    id='checked'
                    onChange={this.handleCheckboxChange()}
                    />
                </Left>
                <ErrorMessage>By clicking here I, as TSC Chair, approve of this applicant to move on for hire and I agree to using the above electronic signature to sign. </ErrorMessage>

                <br/>
          </Buttons>          <CreateButton 
              onClick={() => approveApplication(approval)}
              disabled={this.state.checkmark===false}>
              Approve application #{application.application_id}
          </CreateButton>

      </Application>

        ) 
    }
};
