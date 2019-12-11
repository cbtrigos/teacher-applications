import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AllApps = (props) => {
  let applications = props.applications


  const data = {
    columns: [
      {
        label: 'User ID',
        field: 'user_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Application ID',
        field: 'application_id',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Submitted',
        field: 'submitted',
        sort: 'asc',
        width: 150
      },
      {
        label: 'TSC Department Reviewal Decision',
        field: 'approver_1',
        sort: 'asc',
        width: 150
      },
      {
        label: 'TSC Approval Decision',
        field: 'approver_2',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Job Opening ID',
        field: 'job_opening',
        sort: 'asc',
        width: 200
      },
      {
        label: 'School Name',
        field: 'school_name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Nationality',
        field: 'nationality',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Special Skills',
        field: 'special_skills',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Previous Appt',
        field: 'prev_appt',
        sort: 'asc',
        width: 150
      },
      {
        label: 'National ID',
        field: 'national_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Pin Code',
        field: 'pin_code',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nassit #',
        field: 'nassit',
        sort: 'asc',
        width: 150
      },
      {
        label: 'School District',
        field: 'school_district',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Qualificatins',
        field: 'qualifications',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Special Skills',
        field: 'special_skills',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Created',
        field: 'created',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Certificates',
        field: 'certificates',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Last Modified',
        field: 'last_edited',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Rejection Reason',
        field: 'rejection_reason',
        sort: 'asc',
        width: 150
      },
      {
        label: 'TSC Dept Reviewal Decision Date',
        field: 'approver_1_decision',
        sort: 'asc',
        width: 150
      },
      {
        label: 'TSC Approval Decision Date',
        field: 'approver_2_decision',
        sort: 'asc',
        width: 150
      },
    ],
    rows: applications 
  };

  Object.values(applications).forEach(app =>
    Object.values(data['columns']).forEach(filter => {
      if (app[filter['field']]==='' || app[filter['field']]===null) {
        app[filter['field']]='-'
      }
      if (app[filter['field']]==='' || app[filter['field']]===null) {
      }
    })
    ) 
  return (
    <MDBDataTable
      striped
      color="primary-color"      
      responsive
      bordered
      small
      searching={false}
      // paging={false}
      data={data}
    />
  );
}

export default AllApps;