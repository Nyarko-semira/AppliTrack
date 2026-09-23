# React + Vite
AppliTrack

AppliTrack is a job application tracking web application designed to help job seekers organize, manage, and monitor their job search in one place.

The application provides a structured way to keep track of job opportunities, applications, and application progress while also providing an HR-focused dashboard for managing job postings.

Project status: The current version is focused on the frontend experience and client-side functionality. A separate backend API is currently under development and will be integrated in a future phase.

Features
Job Seekers
Create and manage a profile
Browse available job opportunities
View detailed job information
Apply for jobs through application forms
Track submitted applications
View application details
Manage job application information
Navigate between different stages of the job search


HR / Recruiters
Access an HR dashboard
View available job postings
Create and manage job listings
Review applications
View applicant and application information

User Experience
Responsive interface
Client-side routing
Form validation
Toast notifications for user feedback
Reusable React components
Centralized frontend state management using React Context

Technologies Used
React – UI development
Vite – Development and build tooling
React Router – Client-side routing
Tailwind CSS – Styling and responsive UI
React Hook Form – Form management and validation
React Hot Toast – User notifications
Lucide React – Interface icons
UUID – Unique identifier generation

Project Structure
src/
├── Components/
│   ├── Data/
│   ├── Footer/
│   ├── FormContanier/
│   └── Header/
│
├── Context/
│   ├── AppContext.jsx
│   └── AppProvider.jsx
│
├── pages/
│   ├── SignUpIns/
│   ├── AllActivejobs.jsx
│   ├── AllAddedApps.jsx
│   ├── AllAddedJob.jsx
│   ├── AllJob.jsx
│   ├── ApplicationCard.jsx
│   ├── ApplicationDetails.jsx
│   ├── ApplyJobForm.jsx
│   ├── Home.jsx
│   ├── HrDashboard.jsx
│   ├── JobCard.jsx
│   ├── JobDetails.jsx
│   ├── JobForm.jsx
│   └── JobPreview.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

Current Architecture

The current version is a frontend application built with React.

The frontend uses React Context for centralized client-side state and React Router for navigation between application pages.

At this stage, the application does not yet communicate with a production backend API. The backend is being developed separately as part of the next phase of the project.

Planned Architecture

The planned full-stack architecture will connect:

React Frontend
       │
       │ HTTP / REST API
       ▼
Backend API
       │
       ▼
Database

This will allow application data, authentication, jobs, and applications to be managed through a centralized backend rather than relying solely on client-side storage.
