DROP DATABASE IF EXISTS wildConnection;
CREATE DATABASE wildConnection;
USE wildConnection;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (64),
    lastName VARCHAR (64),
    email VARCHAR (254),
    password VARCHAR (254),
    campus VARCHAR (64),
    promo VARCHAR (64),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color TEXT,
    image TEXT,
    PRIMARY KEY (id)    
) ENGINE=INNODB ;

CREATE TABLE jobOffers (
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    firstName VARCHAR (64),
    lastName VARCHAR (64),
    email VARCHAR (254),
    city VARCHAR (254),
    salaryRange INT,
    contract VARCHAR (64),
    title VARCHAR (254),
    companyName VARCHAR (254),
    description VARCHAR (254), 
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES user (id)
) ENGINE=INNODB ;

DESCRIBE user;
INSERT INTO user (firstName, lastName, email, campus, promo)
VALUES ("Pierre", "Langevin", "lama_san@gmail.com", "Paris", "Feb 2018");
INSERT INTO user (firstName, lastName, email, campus, promo)
VALUES ("Mehdi", "Chtira", "jaffar@gmail.com", "Paris", "Feb 2018")
UPDATE user SET firstName = "Mehdi" WHERE id = 2;



