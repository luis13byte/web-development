CREATE DATABASE IF NOT EXISTS simpledb;
USE simpledb;

CREATE TABLE Persons (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Role varchar(255) NOT NULL,
    Enabled tinyint(1) NOT NULL
);

INSERT INTO Persons VALUES (1, 'Luis', 'admin', '$2y$12$kCx7HzaqI2FOLgJpWwXRFuoD7u.RDmztMEDYlb7C3Z09tWzFFx8NW', 'ROLE_ADMIN', 1);
INSERT INTO Persons VALUES (2, 'El otro', 'usuarionormal', '$2y$12$kCx7HzaqI2FOLgJpWwXRFuoD7u.RDmztMEDYlb7C3Z09tWzFFx8NW', 'ROLE_USER', 1);
