import { Wrapper, FormWrapper, H1} from "../../constants/utils/Styling.jsx";
import React, { Component } from 'react';
import styled from 'styled-components'


export default class Welcome extends Component {
    constructor(props) {
      super(props);
    }
      render() {
        const user = this.props.user
        return (
            <Wrapper> 
                <FormWrapper>
                    <H1>
                        Welcome to your personal dashboard, {user.first_name}!
                    </H1>
                    <H2> Click on Dashboard in the above menu to start. You can complete a primary, secondary, 
                        or vocational school application within 15 minutes, or you can start one and 
                        return whenever you're ready to submit it. <br/>
                        
                    
                    You'll be able to track your application upon submission as it gets approved by each agency. 
                        As approval updates happe to your application, you'll receive both an email and a notification here in your dashboard!<br/>
                        Good luck!
                    </H2>
                </FormWrapper>
                </Wrapper>
  
        );
      }
    }


const H2 = styled(H1)`
font-size: 14pt;`