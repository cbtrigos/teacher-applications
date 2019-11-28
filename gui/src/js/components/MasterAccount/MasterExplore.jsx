import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, HorizSeparator, It} from '../../constants/utils/Styling.jsx'


export default class MasterExplore extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        toApprove: []
      }
    }
  
//     async componentDidMount() {
//       axios 
//        .post('http://localhost:5000/api/get-all-approver-requests', 
//          {"user_id": this.props.user.user_id, 
//          "user_type": this.props.user.user_type
//        }) 
//        .then(response => {
//          if (response.data==="error in getting applications") {
//           throw new Error("Error in pulling application information") } 
//          else {
//            this.setState({ 
//             toApprove: response.data.toApprove, 
//            });
//          }
//        })
//  }

    render() {
      const user = this.props.user

        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Welcome 2 da Xplore, {user.first_name}</H1>

                </FormWrapper>
                </Wrapper>
    
      )
    }
  
  }
  
  




