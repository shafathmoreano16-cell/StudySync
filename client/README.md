# StudySync
StudySync is a full-stack student task tracker web app that helps students manage assignments, organize tasks by status and course, keep track of completed work, and stay motivated with random quotes.

## Live App
Frontend: https://studysync-client.onrender.com
Backend: https://studysync-api-hqj3.onrender.com

## Tech Stack
- React
- Node.js
- Express
- PostgreSQL
- Render
-External Quote API

## Feautures
- User registration
- User login/logour
- Add tasks
- Edit tasks
- Delete task
- Filter by status
- Filter by course
- Seperate completed tasks section
- Random quote generator with New quote button
- Per-user task storage so users only see their own task

## Setup Instructions
1. Clone the Repo
2. Open the project folder
3. Install dependencies in both 'client' and 'server'
4. Add a '.env' file in 'server' with 'DATABASE_URL'
5. Run backend with 'node server.js'
6. Run frontend with 'npm run dev'

## Reflection
 I chose React for the frontend because it alloed me to break the application into reusable components such as the login page, dashboard, task form, task list, filter, and qupte box. I use Node.js and Express for the backend because they are well suited for building REST API routes. PostgreSQL was used for persistent storage so users and tasks could be saved in real database.. I also deployed both frontend and backend with Render so the application could run live online.

 One of the biggest challenges I had was connecting the frontend, backend, and database correctly so CRUD operations worked both locally and after deployment. Another challenge was updating the app so each user only saw their own tasks instead of shared tasks.

 This project helped me understand how to build a full stack application using React, Express, and PostgreSQL. I learned how to organize code into reusable frontend components and backend routes/controllers, how to implement authentication, how to onnect external API, and how to deploy a complete application to Render.

 I believe if there was more time I would improve the movile styling, add tasks sorting by due date, add possibly better validation and error messages, and expand the dashboard with more student productivity tools.


















