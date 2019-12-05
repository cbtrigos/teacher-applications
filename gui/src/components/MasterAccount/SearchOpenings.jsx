import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AllOpenings = (props) => {
    const openings = props.openings
    const data = {
      columns: [
        {
        label: 'Opening ID',
        field: 'opening_key',
        sort: 'asc',
        width: 150
        },
        {
        label: 'Currently Live',
        field: 'live',
        sort: 'asc',
        width: 150
        },
        {
        label: 'Teacher found',
        field: 'closed',
        sort: 'asc',
        width: 150
        },
        {
        label: 'School Name',
        field: 'school',
        sort: 'asc',
        width: 150
        },

        {
        label: 'EMIS code',
        field: 'emis_code',
        sort: 'asc',
        width: 150
          },

        {
          label: 'District',
          field: 'district',
          sort: 'asc',
          width: 270
        },

        {
          label: 'Opening Name',
          field: 'title_proposed_appt',
          sort: 'asc',
          width: 100
        },
        {
            label: 'Proposed Date',
            field: 'date_proposed_appt',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Contact Name',
            field: 'contact_name',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Contact Title',
            field: 'contact_title',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Contact Mobile',
            field: 'contact_mobile',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Contact Email',
            field: 'contact_email',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Reason',
            field: 'reasons_proposed_appt',
            sort: 'asc',
            width: 100
          },
        {
          label: 'Grade',
          field: 'grade_requested',
          sort: 'asc',
          width: 100
        },
        {
            label: 'Qualifications',
            field: 'qualifications_required',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Rejection Reason',
            field: 'opening_rejection_reason',
            sort: 'asc',
            width: 100
          },
      ],
      rows:openings 
    };
  
    return (
    
      <MDBDataTable
        color="primary-color"      
        responsive
        striped
        bordered
        small
        searching={false}
        // paging={false}
        data={data}
      />
    );
  }



export default AllOpenings;