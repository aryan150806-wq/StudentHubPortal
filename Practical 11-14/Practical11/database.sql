CREATE DATABASE IF NOT EXISTS practical11_db;

USE practical11_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    course VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, email, course) VALUES
('Aarav Patel', 'aarav@gmail.com', 'Computer Engineering'),
('Diya Shah', 'diya@gmail.com', 'Information Technology'),
('Rohan Mehta', 'rohan@gmail.com', 'Mechanical Engineering'),
('Priya Desai', 'priya@gmail.com', 'Computer Engineering'),
('Karan Joshi', 'karan@gmail.com', 'Electrical Engineering'),
('Neha Patel', 'neha@gmail.com', 'Information Technology'),
('Arjun Shah', 'arjun@gmail.com', 'Civil Engineering'),
('Isha Mehta', 'isha@gmail.com', 'Computer Engineering'),
('Dev Joshi', 'dev@gmail.com', 'Mechanical Engineering'),
('Mira Desai', 'mira@gmail.com', 'Electrical Engineering'),
('Rahul Patel', 'rahul@gmail.com', 'Information Technology'),
('Ananya Shah', 'ananya@gmail.com', 'Computer Engineering'),
('Jay Mehta', 'jay@gmail.com', 'Civil Engineering'),
('Kavya Joshi', 'kavya@gmail.com', 'Mechanical Engineering'),
('Yash Desai', 'yash@gmail.com', 'Computer Engineering'),
('Nisha Patel', 'nisha@gmail.com', 'Electrical Engineering'),
('Om Shah', 'om@gmail.com', 'Information Technology'),
('Riya Mehta', 'riya@gmail.com', 'Civil Engineering'),
('Manav Joshi', 'manav@gmail.com', 'Computer Engineering'),
('Sana Desai', 'sana@gmail.com', 'Mechanical Engineering');