CREATE TABLE student(
	id SERIAL PRIMARY KEY,
	email VARCHAR(30),
	password VARCHAR(500)
);

CREATE TABLE conveyor(
	id SERIAL PRIMARY KEY,
	email VARCHAR(30),
	password VARCHAR(500)
);
CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    clubname VARCHAR(20) NOT NULL,
    date DATE NOT NULL
);
CREATE TABLE req (
    id SERIAL PRIMARY KEY,
    clubname VARCHAR(20) NOT NULL,
    date DATE NOT NULL
);
CREATE TABLE clubnames (
    id SERIAL PRIMARY KEY,
    clubname VARCHAR(50) NOT NULL,
    deadline DATE 
);
INSERT INTO clubnames (clubname)
VALUES 
    ('WEC'),
    ('IEEE'),
    ('IET'),
    ('KV'),
    ('ISTE'),
    ('PHOTOGRAPHY');

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    admin_name VARCHAR(100) NOT NULL,
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE kv_club_registrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE ,
    year INT NOT NULL,
    branch VARCHAR(100) NOT NULL,
);
like this only exists for the iet,wec,ieee,ISTE


CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
