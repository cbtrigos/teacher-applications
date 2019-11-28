import React, { Component } from "react";
import {H2, H1, It, Div, Category} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'

export default class Tracker extends Component {
    formatDate = date => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
      if (date!==null)
      { const minute = date.slice(14,16)
        const hour = date.slice(11,13)
        const d = date.slice(8,10)
        let day = ''
        const month = monthNames[date.slice(5,7)-1]
        const year = date.slice(0,4)

        {d[1]===1 
          ? day=d+ 'st'
          : d[1]===2 
            ? day = d+ 'nd'
            :d[1]===3
              ? day = d+ 'rd'
              : day = d+ 'th'
        }

        return day + ' of ' + month +', ' + year + ' at time: ' + hour + ':' + minute }
      else {
        return ''
      }
      
    }
    render() {
      const application = this.props.application
      const subdate = this.formatDate(application.last_edited)
      const ddate_1 = this.formatDate(application.approver_1_decision)
      const ddate_2 = this.formatDate(application.approver_2_decision)
      const ddate_3 = this.formatDate(application.approver_3_decision)

      return (
          <div style ={{width:'100%', display:'block'}}>
            <H1>Application Status</H1>
            <H2>#{application.application_id}</H2>
            <Div>
                <Category>
                  Application submitted on: 
                </Category>
                <It>
                  {subdate}
                </It>
            </Div>
            <Div>
            <Category> Approval from School {application.school_name}. Part 1/3: </Category>
              {application.approver_1===null 
                ? <It> Decision Pending</It>
                : application.approver_1==='false' 
                    ? <It>Rejected on {ddate_1}<br/> Rejection reason: "{application.rejection_reason}"</It>
                    : application.approver_1==='true'
                      ? <It>Approved on {ddate_1}</It>
                      : <It> No updates to return </It>
              }
              </Div>
            {application.approver_1==='true' 
            &&
              <Div>
              <Category> Approval from the TSC Teacher Management Department. Part 2/3: </Category>
                {application.approver_2===null 
                  ? <It> Decision Pending</It>
                  : application.approver_2==='false' 
                      ? <It>Rejected on {ddate_2}<br/> Rejection reason: "{application.rejection_reason}"</It>
                      : application.approver_2==='true'
                        ? <It>Approved on {ddate_2}</It>
                        : <It> No updates to return </It>
                }
                </Div>}
            {application.approver_2==='true' 
            &&
            <Div>
            <Category> Final approval from the TSC Chair. Part 3/3: </Category>
              {application.approver_3===null 
                ? <It> Decision Pending</It>
                : application.approver_3==='false' 
                    ? <It>Rejected on {ddate_3}<br/> Rejection reason: "{application.rejection_reason}"</It>
                    : application.approver_3==='true'
                      ? <It>Approved on {ddate_3}</It>
                      : <It> No updates to return </It>
              }
              </Div>
            }

        </div>
      );
    }
  };

