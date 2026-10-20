CREATE DATABASE practical13_db;

USE practical13_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL
);

INSERT INTO students (name, email, course) VALUES
('Aryan Chauhan', 'aryan@gmail.com', 'B.Tech IT'),
('Rahul Patel', 'rahul@gmail.com', 'B.Tech CSE'),
('Neha Shah', 'neha@gmail.com', 'BCA');