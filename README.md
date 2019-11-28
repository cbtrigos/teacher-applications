# Teacher Application, Approval, and Allocation Portal 

[This portal](https://github.com/cbtrigos/teacher-applications) was made to improve Sierra Leone's paper-based teacher application system, one which has a physical application travel between up to three different agencies once submitted by an applicant. 

This portal, SL Teacher Applications, is made for five separate user types: 
* Applicant (user type = 0 )
* Approver 1: School Approver (user type = 1)
* Approver 2: TSC Teacher Manangement Department Representatives (user type = 2) 
* Approver 3: TSC Chair (user type = 3)
* Unauthenticated Approver (user type = 4)
* Master User (user type = 5)
-------------------------------------------------------------------------
#### Background 
The following is provided to give some backgorund into the flow of information through the portal, from the creation of an application to the allocation of the applicant to a school. 

###### Journey of a teacher application 
This portal currently allows for the application to 3 types of public schools: 

- Primary Schools
- Secondary Schools
- Vocational Schools 

Applicants are able to draft applications to return to later or submit them immediately. On submission, they are immediately allowed to track their application as it gets the following 3 approvals: 

- The first approver,chool clearance that there is the room, done by user type 1. If a primary school application, this approval comes from the district educational secretary (from the 14 SL districts). If a secondary school application, the approval comes from __, and if a vocational school application, the approval comes from the school's employing authority's board of directors chairman. 
- On approval, all applications appear for approval in the dashboard of a TSC teacher management department representative (user type 2). This representative submits the teacher's salary and grade level based on the submitted qualifications. 
- On approval, the application arrives at the TSC Chair's dashboard for the final sign-off. On approval, the school is contacted that the application was approved, allowing the school itself to contact the newly hired teacher. 
- If rejected at any point, which is allowed to be done by each of the 3 approvers, the required rejection explanation is emailed to the applicant, and the applicant ceases to continue through the approval chain. 

###### Approver Authentication 

###### Application Features 
-------------------------------------------------------------------------
#### Usage

This project is created using ReactJS for the front-end, Express for the backend, and a MySQL database. 

To use this repo locally, start by cloning it and installing the NPM packages in each the api and the gui.

``` bash
$ git clone https://github.com/cbtrigos/teacher-applications
$ cd api 
$ npm install
$ cd ../gui
$ npm install 
$ npm run build
```

Run it locally by starting up the api and the gui in separate tabs.

``` bash
teacher-applications/gui $ npm start
```
and 
``` bash
teacher-applications/api $ nodemon server.js
```

#### Maintainers

SL Teacher Applications is authored and maintained by Citlali Trigos-Raczkowski and built through the Directorate of Science, Technology, and Innovation [DSTI](https://www.dsti.gov.sl/) in collaboration with the [Teacher Service Commision]()
[Email]: mailto:cbtrigos@mit.edu
