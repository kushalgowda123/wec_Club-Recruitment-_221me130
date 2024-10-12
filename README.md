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

