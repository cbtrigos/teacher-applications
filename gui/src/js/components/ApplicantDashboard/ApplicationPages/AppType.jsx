import React, { Component } from "react";
import {H1, H2,  Wrapper, WideButton,  FormWrapper, CreateButton} from '../../../constants/utils/Styling.jsx'

export default class AppType extends Component {
  render() {
    
    const { values, handleChangeSave, beginApp} = this.props;
        return ( 
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
             <H2>What type of school would you like to apply to?</H2>
             
              <WideButton
                type = "button"
                value='Primary'
                id='primary'
                chosen={values.application_type==='Primary'}
                noValidate
                onClick={handleChangeSave('application_type')}
                />

             <WideButton 
                type = "button"
                value='Secondary'
                chosen={values.application_type==='Secondary'}
                id='secondary'
                onClick={handleChangeSave('application_type')}
             />

              <WideButton 
                type = "button"
                chosen={values.application_type==='Vocational'}
                value='Vocational'
                id='vocational'
                onClick={handleChangeSave('application_type')}
               />


             
                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={beginApp()}
                disabled={values.application_type===null}
              >Begin Application</CreateButton> 
            </FormWrapper>
            </Wrapper>

            );

    };
};