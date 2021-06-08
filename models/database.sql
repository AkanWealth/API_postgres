CREATE DATABASE easy_class;

--\c into easy_class

CREATE TABLE users
(user_id SERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
UNIQUE (email));
-- course section
CREATE TABLE courses
(course_id SERIAL PRIMARY KEY NOT NULL,
title TEXT,
description TEXT,
instructor VARCHAR(200) NOT NULL);
-- contact schema
CREATE TABLE contact
(contact_id SERIAL PRIMARY KEY NOT NULL,
contact_name VARCHAR(225) NOT NULL,
contact_email VARCHAR(225) NOT NULL,
contact_message TEXT NOT NULL);
-- todo schema
CREATE TABLE todolist
(todo_id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(200) NOT NULL,
description TEXT NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP);