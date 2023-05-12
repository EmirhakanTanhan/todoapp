CREATE DATABASE todoapp;

CREATE TABLE tags (
   id SERIAL PRIMARY KEY,
   name VARCHAR(30)
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    status BOOLEAN,
    date VARCHAR(255),
    tagId INTEGER,
    CONSTRAINT FK_tagId FOREIGN KEY (tagId)
        REFERENCES tags (id) MATCH SIMPLE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    hashed_password VARCHAR(255)
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    refreshToken VARCHAR(255)
);

INSERT INTO todos(user_email, title, status, date, tagId)
VALUES ('me@emirhakan.com', 'Create todo app', false, 'Thu May 11 2023 21:23:37 GMT+0300', 2);

INSERT INTO tags(name)
VALUES ('Social'), ('Work'), ('School'), ('Personal');