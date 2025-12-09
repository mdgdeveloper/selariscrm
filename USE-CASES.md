# Use Cases

## UC-01: User Management

### UC-01.01: Create User

- **Actor**: Admin
- **Description**: Admin creates a new user account in the system.
- **Preconditions**: Admin is logged in.
- **Postconditions**: A new user account is created and stored in the database.

- **Main Flow**:
  1. Admin navigates to the user management section.
     1. User Management section is only accessible to Admins.
     2. User Management section is available in the Main Dashboard
  2. Admin fills out the user creation form with necessary details (e.g., username, email, password).
  3. Admin submits the form.
  4. System validates the input data.
  5. System creates a new user record in the database.
  6. System confirms the successful creation of the user account to the Admin.


## UC-02: User Authentication

### UC-02.01: User Login
- **Actor**: User
- **Description**: User logs into the system using their credentials.
- **Preconditions**: User has a valid account.
- **Postconditions**: User is authenticated and granted access to the system.

- **Main Flow**:
  1. User navigates to the login page.
  2. User enters their username and password.
  3. User submits the login form.
  4. System validates the credentials.
  5. If credentials are valid, system grants access to the user dashboard (redirects).
  6. If credentials are invalid, system displays an error message and prompts for re-entry.

- **Alternative Flows**:
  - 1a. If user navigates to main page and is not logged in, they are redirected to the login page.

### UC-02.02: User Logout
- **Actor**: User
- **Description**: User logs out of the system.
- **Preconditions**: User is logged in.
- **Postconditions**: User is logged out and session is terminated.

- **Main Flow**:
  1. User clicks on the logout button/link.
  2. System terminates the user session.
  3. System redirects the user to the login page with a logout confirmation message.


## UC-03: Data Management

### UC-03.01: Create New Provider
- **Actor**: User
- **Description**: User creates a new provider record in the system.
- **Preconditions**: User is logged in.
- **Postconditions**: A new provider record is created and stored in the database.

- **Main Flow**:
  1. User navigates to the provider management section.
  2. User fills out the provider creation form with necessary details (e.g., name, contact information).
  3. User submits the form.
  4. System validates the input data.
  5. System creates a new provider record in the database.
  6. System confirms the successful creation of the provider record to the User.