# Xpansion Tech Test

A single-page application showing the top 4 urban areas in each continent. 
The application is built using a React frontend and a Node/Express backend.

### Getting Started

1. Make sure that Node.js is installed on your machine. If it isn't, you can download it from the official website: https://nodejs.org/.
2. Clone the repository to your local machine using ```git clone```.
3. Navigate to the project folder.
4. Run ```npm install``` in both the backend and frontend folders to install the required dependencies.
5. Create a .env file in the root of the backend folder and add PORT=4000 to it. This sets the port that the backend server will run on.
6. Run ```npm start``` in both the backend and frontend folders to start the application. Make sure that both servers are running simultaneously.
7. You can run tests in the backend folder using ```jest``` and tests in the frontend folder using ```npm run test```.

### Project Structure

The project is structured into two main folders:
* backend: This folder contains the Node.js backend that serves the API endpoints for the frontend to consume. The backend is built using the Express.js framework.

* frontend: This folder contains the React frontend that displays the data from the backend. 

### API Endpoints

* GET /continentId: Returns the top 4 urban areas in that continent ranked by teleport city score.

### Technologies Used

* Node.js
* Express.js
* React
* Jest
* React Testing Library
