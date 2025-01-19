# Academic Evaluation System

This project is an academic evaluation system that allows administrators, teachers, and students to collaborate on course evaluations. The platform enables the creation of course evaluations, submission of student feedback, and analysis of results.

## Features

- **Evaluation Creation**: Administrators can create evaluations for courses.
- **Email Notifications**: Teachers and students are automatically notified via email when evaluations are created.
- **Student Feedback**: Students can submit feedback for their courses.
- **Result Analysis**: Teachers and administrators can view detailed feedback and statistics for each course.
- **Role-Based Access**: Separate interfaces for administrators, teachers, and students.

---

## Technologies Used

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Environment Management**: dotenv

---

## Prerequisites

Ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (v16+ recommended)
2. [MongoDB](https://www.mongodb.com/) (local or hosted instance)
3. A Gmail account for sending email notifications.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/CloNTCL/AdvancedProg
```

### 2. Configure Environment Variables

Create a .env file in the backend directories with the same informations of .env file included on the ZIP file


### Run the Application

For run the application, you must run backend and the frontend.
To run the backend, go to the backend folder. 
```bash
cd backend
npm install --legacy-peer-deps
npm start
```

And then, open another console and type
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```



### Usage

## For Administrators
1. Log in as an administrator.
2. Create evaluations for courses.
3. Monitor the progress of evaluations.
##For Teachers
1. View assigned courses.
2. Analyze feedback submitted by students.
##For Students
1. View evaluations assigned to your courses.
2. Submit your feedback.
