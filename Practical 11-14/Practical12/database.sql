
CREATE DATABASE IF NOT EXISTS practical12_db;
USE practical12_db;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(150) NOT NULL,
    status ENUM('Upcoming', 'Ongoing', 'Completed') DEFAULT 'Upcoming',
    poster VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo admin:
-- Username: admin
-- Password: admin123

INSERT INTO admins (username, password)
VALUES (
    'admin',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/ggu.'
);

INSERT INTO events (title, description, event_date, location, status)
VALUES
('Web Development Workshop',
 'A practical workshop on web development.',
 '2026-11-15', 'Computer Lab 1', 'Upcoming'),

('Coding Competition',
 'A programming competition for students.',
 '2026-10-10', 'Main Auditorium', 'Completed'),

('Project Exhibition',
 'Students present their academic projects.',
 '2026-11-25', 'Seminar Hall', 'Upcoming');
