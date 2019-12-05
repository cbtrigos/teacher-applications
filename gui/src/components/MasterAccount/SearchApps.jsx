import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AllApps = (props) => {
  const applications = props.applications
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
        label: 'First Name',
        field: 'first_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Last Name',
        field: 'last_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Other Names',
        field: 'other_names',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Mobile Number',
        field: 'mobile_number',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nationality',
        field: 'nationality',
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
        label: 'Created',
        field: 'created',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Last Edited',
        field: 'last_edited',
        sort: 'asc',
        width: 150
      }
    ],
    rows: applications 
  };

  return (
    <MDBDataTable
      striped
      color="primary-color"      
      responsive
      bordered
      small
      data={data}
    />
  );
}

export default AllApps;