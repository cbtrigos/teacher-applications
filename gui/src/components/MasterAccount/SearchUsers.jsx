import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AllUsers = (props) => {
  const users = props.users
  const data = {
    columns: [
      {
        label: 'User ID',
        field: 'user_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'User Type',
        field: 'user_type',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'First Name',
        field: 'first_name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Last Name',
        field: 'last_name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Gender',
        field: 'gender',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Mobile',
        field: 'mobile_number',
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
        label: 'Birth Date',
        field: 'birth_date',
        sort: 'asc',
        width: 150
      }
    ],
    rows:users 
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

export default AllUsers;