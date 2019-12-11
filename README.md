# SL Teacher Applications 

[This portal](https://slteacherapplications-8ce98.firebaseapp.com/openings) was made to digitize and improve Sierra Leone's paper-based teacher application, approval, and allocation system, which has a physical paper application travel between up to three different agencies once submitted by an applicant and can take up to six months just to be seen. Many applications have been destroyed by flooding and other emergencies, leaving thousands of applicants waiting in vain for decisions that will never come. The project addresses this, allowing on-the-go tracking for everyone involved. 

This portal, SL Teacher Applications, is made for five user types: 
* Applicant (user type = 0 ) 
* Reviewer: TSC Teacher Manangement Department Representatives (user type = 1) 
* Approver 2: TSC Chair (user type = 2)
* School Administrator: those submitting a job opening for their school (user type = 4)
* Master User: reviews job opening requests submitted by school administrators and has the ability to modify user types, job openings, and application reviewal (user type = 5)

--------------------------------------------------------------------
### Background 
The following is provided to give some background into the flow of information through the portal, from the creation of an application to the allocation of the applicant to a school. 

#### Public vs. Private 
There are 5 pages open to the public: 
- The Home page, which provides applicants with the following materials: 
  - Reports and Data through the [SL Education Data Hub](https://www.educationdatahub.dsti.gov.sl/)
  - Policy and Governance surrounding teachers and education
  - Grants and Learning Materials/Opportunities 
  - Application Information 
- Job Opening Page, which lists all current live job openings that is taking applications
- FAQ Page
- Contact Us Page (nodemailer)
- Sign Up Page (Registration for either an applicant or unauthorized approver type)
- Login Page (email & password -- stored using bcrypt)
- Forgot Password Page 

The following are private pages available to signed-in users only: 
- Every user has a dashboard: 
    - Applicants (user type 0) can create, edit, submit, and track their applications 
    - Reviewers (user type 1) can approve for continuation or reject applicant applications by submitting the appropriate form. They can then track all of _their own_ previously reviewed applications. Rejections mandate a reason. 
    - Approvers (user type 2) see all applications approved by any reviewer. Approvers can track their reviewed applications and either approve or reject new applications with the same rejection form or an approval form (requiring a signature).
- The Master account users' dashboard is where job opening requests get reviewed. Master account users can also see all submitted application info, all user info, and job opening info, as well as make user type changes and can make job openings live and not live. 
- All logged-in users regardless of user type can access an account page where they can change their:
    - first or last name (once / 60 days)
    - email (once / 60 days)
    - phone number 
    - password (checking against their current password)

#### Journey of a teacher application 
This portal currently allows for the application to 3 types of public schools: 

- Primary Schools
- Secondary Schools
- Vocational Schools 

Applicants can draft applications to return to or delete, or submit them immediately. On submission, they are immediately allowed to track their application as it gets reviewed and/or approved: 

- Firstly, all national identifications get verified against the NCRA's database to make sure all are authentic. 
- Verified applications then appear for approval in the dashboard of a TSC teacher management department representative (user type 1). This representative verifies the teacher's salary, qualificatinos, certificates, etc. 
- All those which are not rejected then arrive at the TSC Chair's dashboard for the final sign-off. On approval, the administrator that submitted the job posting receives the application. The posting is live for at least one month, where it can be made un-live by an administrator requesting one of the candidates for hire. The candidate then has one week to accept or reject. If the candidate accepts, the job posting is closed; if the candidate rejects, the administrator can either request another candidate for hire or make the posting live again. 
- If rejected at any point, which is allowed to be done by either the reviewer or the approver, the required rejection explanation is emailed to the applicant and the application ceases to continue through the approval chain. 

-------------------------------------------------------------------------
### Progress & the Future 

- [x] creating registration + login capabilities with routing 
- [x] cookies & staying logged in on refresh 
- [x] applicant dashboards with application register, save, submit, and delete routes 
- [x] approval dashboards with approving/rejecting routes 
- [x] application tracking capabilities
- [x] pulling the appropriate applications for review & tracking for each user
- [x] functioning contact-us email form
- [x] authenticated signatures 
- [x] auto sign-out after 15 minutes
- [x] deployment (Firebase for gui, Heroku for api + database)
- [x] option to download application pdf (react-pdf)
- [x] fuzzy search for master through apps, users, and openings (fuse.js)
- [ ] password recovery 
- [ ] email and mobile confirmation
- [ ] file uploading & s3 buckets
--------------------------------------------------------------------

### Usage

This project is created using ReactJS, Express, and MySQL. 

To use this repo locally, you'll need the database tables and the authentication information to startup the backend (my email is at the end). Go ahead and update the following files with the authentication information (replace all "process.env.*"):

- api/authentication/emailAuth.json
- api/authentication/awsAuth.json
- api/authentication/mysql.json

Go ahead and clone the repo and install the NPM packages in each the api and the gui.


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


... or check out the portal live [here](https://slteacherapplications-8ce98.firebaseapp.com/openings).
--------------------------------------------------------------------

#### Maintainers

SL Teacher Applications is authored and maintained by Citlali Trigos-Raczkowski and built through the Directorate of Science, Technology, and Innovation ([DSTI](https://www.dsti.gov.sl/)) in collaboration with the Teacher Service Commision.

Email me here: cbtrigos@mit.edu
:blush: :wave:
