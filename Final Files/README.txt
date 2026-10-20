STUDENTHUB PORTAL - PRACTICALS 1 TO 7
========================================

This is the supplied Practical 6 StudentHub project with the Practical 7 PHP
backend added to the existing registration form. Existing project files are
retained; the registration form now posts to the PHP processor.

PRACTICAL 7 FEATURES
--------------------
1. Existing html/register.html submits using POST to php/register.php.
2. PHP validates submitted values on the server.
3. Text fields are trimmed; email uses filter_var().
4. Program and semester are checked against allowed values.
5. Duplicate email addresses and Student IDs are rejected.
6. Records are stored in data/registrations.csv using fputcsv().
7. flock() protects the file while it is checked and written.
8. Passwords are saved as password_hash() values, never as plain text.
9. Clear success and error messages are displayed.

XAMPP SETUP
-----------
1. Extract the StudentHubPortal folder into C:\xampp\htdocs\
2. Start Apache in XAMPP Control Panel. MySQL is not needed for Practical 7.
3. Open http://localhost/StudentHubPortal/
4. Register at http://localhost/StudentHubPortal/html/register.html
5. After the first valid submission, check data/registrations.csv.

SAMPLE VALIDATION INPUT
-----------------------
Name: Aryan Chauhan
Student ID: 25DCE191
Email: use a test email address
Phone: 9876543210
Program: B.Tech
Semester: 3
Password: Student@123
Use a unique email and Student ID for each successful test. These are sample
values; do not reuse a real account password.

TEST CASES
----------
1. Valid values: a CSV record should be created and success displayed.
2. Invalid email: server should display an email validation error.
3. Invalid Student ID: server should display the ID format error.
4. Invalid phone: server should display a mobile number error.
5. Semester 0 or 9: server should reject the value.
6. Weak password: server should reject the value.
7. Reuse email or Student ID: duplicate registration should be rejected.
8. Open php/register.php directly: only POST submissions are accepted.

IMPORTANT
---------
- The CSV file is created automatically after the first successful submission.
- data/.htaccess blocks direct HTTP access to stored records on Apache 2.4.
- This is a learning practical, not a production-ready account system.
- Practical 7 uses CSV file storage; MySQL is introduced in Practical 8.
- Existing Practical 5 JavaScript validation remains in js/script.js.


PRACTICAL 10 - SECURE LOGIN / LOGOUT WITH PHP SESSIONS
======================================================

Implemented core requirements:
1. Login using Student ID and password.
2. Password verification using password_verify().
3. Session ID regeneration after successful login.
4. Student and admin role-based redirection.
5. Protected student and admin dashboards.
6. Automatic logout after 15 minutes of inactivity.
7. Logout clears the session and session cookie.

Remember-me token is not implemented because it is an optional advanced extension.

SETUP
-----
1. Copy the StudentHubPortal folder into XAMPP's htdocs directory.
2. Start Apache and MySQL.
3. Open phpMyAdmin and select the existing studenthub_db database.
4. Open php/practical10_setup.sql and run its ALTER TABLE statement once.
5. Register a student using the existing registration page, or use an existing
   student record created in Practical 9.
6. To make an account an administrator, run this query in phpMyAdmin after
   replacing the sample ID:
      UPDATE students SET role = 'admin' WHERE student_id = 'YOUR_STUDENT_ID';
7. Open:
      http://localhost/StudentHubPortal/html/login.html
8. Student accounts are redirected to dashboard.php. Admin accounts are
   redirected to admin_dashboard.php.
9. Use the Logout link to end the session.

IMPORTANT
---------
- The SQL migration adds the role column. Run it only once.
- Existing Practical 9 password hashes are reused. Do not manually replace
  hashed passwords with plain-text passwords.
- Contact page is static and contains no form or data-submission fields.
- The sample support email is a placeholder. Replace it with official details.
- Session timeout is set to 15 minutes. Change $sessionLifetime in php/auth.php
  if your lab instructions require a different duration.
- This local XAMPP setup uses secure=false for the session cookie because it
  normally runs over HTTP. Use HTTPS and secure=true on a live deployment.
