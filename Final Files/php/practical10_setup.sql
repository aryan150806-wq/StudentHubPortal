-- StudentHub Practical 10 database update
-- Run this once in phpMyAdmin > studenthub_db > SQL.
-- It adds a role column to the existing students table.
-- Existing records automatically receive the default role 'student'.

ALTER TABLE students
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'student';

-- After creating/logging in with the account that should be an administrator,
-- replace the sample Student ID below with that account's actual Student ID:
-- UPDATE students SET role = 'admin' WHERE student_id = '25DCE191';

-- Example:
-- UPDATE students SET role = 'admin' WHERE student_id = 'YOUR_STUDENT_ID';
