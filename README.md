# Club Recruitment Portal - WEC Club Registration Task

This **Club Registration Portal** allows students to register for various clubs, conveyors to manage club-related tasks, and an admin to approve or deny club registration requests. It includes features like student and conveyor login, registration, and admin functionalities to manage clubs and approvals.

## Features

### Roles:
- **Student**: Register for clubs and view club details.
- **Conveyor**: Manage club details and view registrations.
- **Admin**: Approve or deny club registration requests.

### Functionalities:
- **Student Registration**: Students can register, login, and apply for various clubs.
- **Conveyor Registration**: Conveyors (club coordinators) can manage club registrations.
- **Admin Dashboard**: Admin can approve or reject club registration requests and manage the club list.
- **Club Registration Approval**: Admin reviews and approves or denies club registration requests.
- **Club Reports**: Download club registrations in CSV format.

## Installation

### Prerequisites:
- **Node.js**: Ensure Node.js and npm are installed on your system.
- **PostgreSQL**: Set up PostgreSQL and pgAdmin.

### Steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kushalgowda123/wec_Club-Recruitment-_221me130.git
   ```

2. **Navigate to the project folder**:

   ```bash
   cd wec_Club-Recruitment-_221me130
   ```

3. **Install the required npm packages**:

   ```bash
   npm install
   ```

4. **Set up PostgreSQL**:

   - Download and install PostgreSQL and pgAdmin from the following links:
     - [PostgreSQL Installer for Windows](https://sbp.enterprisedb.com/getfile.jsp?fileid=1258649)
     - [PostgreSQL Installer for Mac](https://sbp.enterprisedb.com/getfile.jsp?fileid=1258653)
   - Create a new database named `postgres`.
   
5. **Set up the database schema** by running the provided SQL queries on your PostgreSQL server.

6. **Start the server**:

   ```bash
   nodemon index.js
   ```

   If you are using nodemon for hot-reloading, the command is the same:

   ```bash
   nodemon index.js
   ```

7. **Visit the portal**: Open your browser and go to `http://localhost:3000` to access the portal.

## Routes

### Public Routes:
- `/` - Home page.
- `/logstd` - Student login page.
- `/regstd` - Student registration page.
- `/logfac` - Conveyor (faculty) login page.
- `/regfac` - Conveyor registration page.
- `/clubregistration` - Club registration form for students.

### Admin Routes:
- `/approveClub` - Admin page to approve or deny club registration requests.
- `/addAnnouncement` - Add announcements.
- `/viewAnnouncements` - View all announcements.

### Club Routes:
- `/clubs/kv`, `/clubs/iste`, `/clubs/iet`, etc. - View individual club pages.
- `/downloadClubRegistrations/:clubname` - Download club registration CSV.

## Admin Login

Use the following credentials to login as an admin:

- **Email**: kushal@123
- **Password**: 1234

## Known Issues

- The UI may break on smaller screens.
- Students can submit multiple feedback entries for clubs, but this can be managed through deletion.

## Technologies Used

- **Node.js** with Express.js for server-side functionality.
- **PostgreSQL** for database management.
- **pg** module for PostgreSQL connection.
- **bcrypt** for password hashing and authentication.
- **EJS** for rendering HTML templates.

## Contributing

Feel free to fork this project, make improvements, and submit pull requests!

## screenshot
- **Database**
<img width="1710" alt="Screenshot 2024-10-12 at 10 57 22 PM" src="https://github.com/user-attachments/assets/d2695177-8b9d-433e-b872-07e14e2a88b4">
- **Homepage**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 50 53 AM" src="https://github.com/user-attachments/assets/eb2e7551-e754-4de9-9a98-560283f65c6a">
- **studentlogin**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 51 10 AM" src="https://github.com/user-attachments/assets/28f6c983-d325-47c6-aa31-bea03d9e1325">
- **studentregister**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 06 03 PM" src="https://github.com/user-attachments/assets/380b7876-6d31-471d-980c-d77dc2dda3aa">
- **conveyorlogin**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 53 04 AM" src="https://github.com/user-attachments/assets/8c31c646-87f2-4f26-89d7-219dc48b4225">
- **studetHome**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 51 33 AM" src="https://github.com/user-attachments/assets/e84fed90-0c6e-4e44-9074-ca8c435b811b">
- **conveyortHome**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 10 53 PM" src="https://github.com/user-attachments/assets/9a201a71-b230-430b-8d56-6622d3e7f6da">
- **adminlogin**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 12 16 PM" src="https://github.com/user-attachments/assets/44cfffb5-345e-43da-87ba-20821987dab2">
- **adminhome**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 13 29 PM" src="https://github.com/user-attachments/assets/63c97ac1-7015-430b-8180-e59fb3871c86">
- **Announcementadding**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 16 31 PM" src="https://github.com/user-attachments/assets/3bc1db4f-c4b9-4b19-a14e-66d3d3ad89e7">
- **downloading csvfile of number students registered**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 17 20 PM" src="https://github.com/user-attachments/assets/38bad384-6ece-4fa4-bb64-6dfa4cebbb08">
- **generalannouncement**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 20 16 PM" src="https://github.com/user-attachments/assets/c4562304-991d-4ff0-9c6f-2c2317723fc2">
- **Registering for specific club**
- <img width="1710" alt="Screenshot 2024-10-12 at 11 24 33 PM" src="https://github.com/user-attachments/assets/abfc4564-4e38-4abf-a5b7-903c7051412e">

