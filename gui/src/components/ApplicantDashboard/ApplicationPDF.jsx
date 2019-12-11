import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
const styles = StyleSheet.create({
    body: {
      marginTop: 35,
      flexDirection: 'row',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
    },
    text: {
      margin: 12,
      fontSize: 14,
      fontFamily: 'Times-Roman'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        width: 200,
        border:'2pt solid #817990',
      },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },

    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        margin: 15,
      },
  });
  




export default class PdfDocument extends React.Component {
    constructor(props) {
        super(props);
    };    

render () {
    const now = moment(new Date()).format('YYYY-MM-DD')
    const {application_id, user_id, job_opening, school_name, other_names, mobile_number, nationality, pin_code, nassit, qualifications, special_skills, created, last_name, first_name, email, sex, last_edited, prev_appt, birth_date, national_id, certificates, job_title} = this.props.application
return (
    <Document>
      <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Application #{application_id}</Text>
      <Text style={styles.author}>{first_name} {last_name}</Text>
          <Text style={styles.author}>Submitted on {last_edited.slice(0,10)}</Text>
          <Text style={styles.author}>PDF created on {now}</Text>
        <View style={styles.body}>
          <View style={styles.section}>
          <Text style={styles.header}>Basic Information</Text>
            <Text style={styles.text}>User ID: {user_id}</Text>
            <Text style={styles.text}>First Name: {first_name}</Text>
            <Text style={styles.text}>Last Name: {last_name}</Text>
            <Text style={styles.text}>Other Names: {other_names}</Text>
            <Text style={styles.text}>Date of Birth: {birth_date.slice(0,10)}</Text>
            <Text style={styles.text}>Mobile Number: {mobile_number}</Text>
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>Sex: {sex}</Text>
            <Text style={styles.text}>Nationality: {nationality}</Text>
            <Text style={styles.text}>National ID: {national_id}</Text>
            <Text style={styles.text}>Nassit Number: {nassit}</Text>
          </View>
          <View style={styles.section}>
          <Text style={styles.header}>Teacher Information</Text>
            <Text style={styles.text}>Job Opening ID: {job_opening}</Text>
            <Text style={styles.text}>Job Title: {job_title}</Text>
            <Text style={styles.text}>Pin Code: {pin_code}</Text>
            <Text style={styles.text}>Previous Appointment: {prev_appt}</Text>
            <Text style={styles.text}>Qualifications: {qualifications}</Text>
            <Text style={styles.text}>Special Skills: {special_skills}</Text>
            <Text style={styles.text}>Certificates: {certificates}</Text>
            <Text style={styles.text}>Created On: {created.slice(0,10)}</Text>
            <Text style={styles.text}>School Name: {school_name}</Text>
        </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
      </Page>
    </Document>)
  }
}