#### Event Management Application

Overview

This project is an event management application where users can create, read, update, and delete events. It features user-specific event management, pagination, sorting, filtering, and search functionality. The backend is built using Node.js, Express.js, GraphQL (Apollo Server), and MySQL with Sequelize. The frontend uses React.js for an interactive user interface.

### Features
Event Management
CRUD Operations:
Users can create, read, update, and delete events.

### Installation
Clone the repository:

git clone https://github.com/KhushalKoriya/EventManagementTool.git

Install dependencies for both the frontend and backend:

### for Backend
cd Backend

npm install --legacy-peer-deps 

### for Frontend
cd ../FrontendUI

npm install --legacy-peer-deps 


### Set up MySQL database and configure your environment variables:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=""

DB_NAME=eventmanagement_db


### Run the database migrations:
cd Backend

npx sequelize-cli db:migrate

### Start the backend server:

npm start

### Start the frontend server:

cd ../FrontendUI

npm start


### Usage
Create an Event:
Go to the event form and fill in the details like event name, description, images, start date, and end date.
List Events:
View all events with pagination, sorting, filtering, and search functionality.
Edit/Delete Events:
As the creator of the event, you can edit or delete your events.

![Screenshot 2024-09-22 200221](https://github.com/user-attachments/assets/03bb769e-0f66-44de-a9fb-0c457769a928)
![Screenshot 2024-09-22 200134](https://github.com/user-attachments/assets/f9df951f-a387-4896-be60-3cc4a5a56358)

