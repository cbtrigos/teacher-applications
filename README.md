# SL Teacher Applications 

[This portal](https://github.com/cbtrigos/teacher-applications) was made to digitize and improve Sierra Leone's paper-based teacher application, approval, and allocation system, which has a physical paper application travel between up to three different agencies once submitted by an applicant and can take up to two months just to be seen. 

This portal, SL Teacher Applications, is made for five user types: 
* Applicant (user type = 0 ) 
* Approver 1: School Approver (user type = 1)
* Approver 2: TSC Teacher Manangement Department Representatives (user type = 2) 
* Approver 3: TSC Chair (user type = 3)
* Unauthenticated Approver (user type = 4); those waiting to be authenticated to become one of: Approver 1, Approver 2, Approver 3, or a Master User 
* Master User (user type = 5)


--------------------------------------------------------------------
### Background 
The following is provided to give some backgorund into the flow of information through the portal, from the creation of an application to the allocation of the applicant to a school. 

#### Public vs. Private 
There are 5 pages open to the public: 
- The Home page, which provides applicants with the following materials: 
  - Reports and Data through the [SL Education Data Hub](https://www.educationdatahub.dsti.gov.sl/)
  - Policy and Governance surrounding teachers and education
  - Grants and Learning Materials/Opportunities 
  - Application Information 
- FAQ Page
- Contact Us Page (nodemailer)
- Sign Up Page (Registration for either an applicant or unauthorized approver type)
- Login Page (email & password -- stored using bcrypt)
- Forgot Password Page 

The following are private pages available to signed-in users: 
- Every user has a dashboard: 
    - Applicants can create, edit, submit, and track their applications 
    - Approver 1 can approve or reject applicant applications by submitting the appropriate form. They can then track all of _their own_ reviewed applications. Rejections mandate the signature, name, and reason. Approvals require
        - School ID
        - Title, Date, and Reason(s) for the Proposed Appointment
        - Number of: current pupil enrollment, total number of teachers, number of teachers on payroll (_not necessarily the same_), & trained and qualified for that level from the school
        - Name, signature, phone number, and email of the approver
    - Approver 2 sees all applications approved by any approver 1 and can track and either approve or reject them with the same rejection form or an approval form requesting:
        - teacher's basic salary 
        - grade
    - The TSC Chair (Approver 3) submits just a name to approve an application or the same rejection form to reject. 
- The master Account user's dashboard is where unauthorized approval requests get reviewed. Master account users can also see all applications, user information, and school information. 
- Each logged-in user sees an account page where they can 
    - Change their first or last name (once / 60 days)
    - Change their email (once / 60 days)
    - Change their phone number 
    - Change their password (while knowing their own password)

#### Journey of a teacher application 
This portal currently allows for the application to 3 types of public schools: 

- Primary Schools
- Secondary Schools
- Vocational Schools 

Applicants can draft applications to return to or delete, or submit them immediately. On submission,they are immediately allowed to track their application as it gets the following 3 approvals: 

- The first approver is that representing the school. This approver gives clearance that the school both has the capacity and the desire to hire the teacher. If the application is for a primary school, the approver is the district educational secretary (from the 14 SL districts). If it's a secondary school application, the approval comes from __, and if it's a vocational school application, the approval comes from the school's employing authority's board of directors chairman. 
- On approval, all applications appear for approval in the dashboard of a TSC teacher management department representative (user type 2). This representative submits the teacher's salary and grade level based on the submitted qualifications. 
- On approval, the application arrives at the TSC Chair's dashboard for the final sign-off. On approval, the school is contacted that the application was approved, allowing the school itself to contact the newly hired teacher. 
- If rejected at any point, which is allowed to be done by each of the 3 approvers, the required rejection explanation is emailed to the applicant, and the applicant ceases to continue through the approval chain. 

#### Approver Authentication 

* The public registration form allows for someone to register as an applicant (user type 0) or as an unauthorized approver (user type 4). Using the login information, they can re-enter the portal whenever needed just like any other online account. 
* Unauthorized approvers are given a temporary waiting dashboard while their credentials are verified. Unauthorized approvers are _not_ able to view any applications. 
* Master account users (user type 5) can then review the unauthorized approvers' applications and either reject or authorize the unauthorized users to become an approver type 1, 2, 3, or 5. When approved or rejected, the user receives an email notification. If approved, the user's dashboard will switch over to their authorized dashboard for their new user type.


-------------------------------------------------------------------------
### Usage

This project is created using ReactJS for the front-end, Express for the backend, and a MySQL database. 

To use this repo locally, you'll need the database tables and the authentication information to startup the backend. Go ahead and update the following files with the authentication information and also remove the "-sample" from the file names:

- api/authentication/emailAuth-sample.json
- api/authentication/awsAuth-sample.json
- api/authentication/mysql-sample.json

Then, go ahead and clone it and install the NPM packages in each the api and the gui.


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

SL Teacher Applications is authored and maintained by Citlali Trigos-Raczkowski and built through the Directorate of Science, Technology, and Innovation ([DSTI](https://www.dsti.gov.sl/)) in collaboration with the Teacher Service Commision.

Email me here: cbtrigos@mit.edu
:blush: :wave:
