import { Wrapper, FormWrapper, H1} from "../../constants/utils/Styling.jsx";
import React, { Component } from 'react';
import ApproverApps from '../AdminDashboard/ApproverApps.jsx'
import styled from 'styled-components'


export default class Welcome extends Component {
    constructor(props) {
      super(props);
    }
      render() {
        const user = this.props.user

        return (
            <Wrapper> 
              {user.user_type===0
                ?
                  <FormWrapper>
                    <H1>
                      Welcome to your personal dashboard, {user.first_name}!
                    </H1>
                    <H2> Click on Dashboard in the above menu to start. <br/><br/>
                        You can complete a primary, secondary, 
                        or vocational school application within 15 minutes, or you can start one and 
                        return whenever you're ready to submit it. <br/><br/>
                    Once submitted, you'll be able to track your application as it gets approved by each agency. 
                        As approval updates occur for your application, you'll receive both an email and a notification here in your dashboard!<br/><br/>
                        Good luck!
                    </H2>
                  </FormWrapper>
                :<>
                  <FormWrapper>
                    <H1>
                      Welcome to your personal dashboard, {user.first_name}!
                    </H1>
                    <H2>
                      This dashboard was created for you to review applications efficiently and easily.<br/><br/>
                      Explore the below applications and either approve them in this tab or you can open them in a new tab. <br/><br/>
                      Good luck!
                    </H2>
                  </FormWrapper> <br/> <br/>
                  <ApproverApps user={this.props.user}/>
                </>

            }
         </Wrapper>
  
        );
      }
    }


const H2 = styled(H1)`
font-size: 14pt;`