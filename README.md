SQL for creating the db, and the db tables:

CREATE DATABASE user;

(in the db user)
CREATE TABLE branches (
    branchId INT(11) NOT NULL AUTO_INCREMENT,
    branchName VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    PRIMARY KEY (branchId)
);

CREATE TABLE login (
    id INT(11) NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    usertype VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50) UNIQUE,
    sc_no VARCHAR(50) UNIQUE,
    address TEXT NOT NULL,
    phoneNo VARCHAR(20) NOT NULL,
    branch_id INT(11) NOT NULL,
    demandType VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (branch_id) REFERENCES branches(branchId)
);

CREATE TABLE bills (
    billId INT(11) NOT NULL AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    meterReadDate DATE NOT NULL,
    previousReading DECIMAL(10,2) NOT NULL,
    currentReading DECIMAL(10,2) NOT NULL,
    consumption DECIMAL(10,2) NOT NULL,
    payableAmount DECIMAL(10,2) NOT NULL,
    billDate DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (billId),
    FOREIGN KEY (customer_id) REFERENCES login(customer_id)
);

CREATE TABLE demandtype (
    value VARCHAR(10) NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL
);

CREATE TABLE no_light_contacts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    contactName VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    remarks TEXT NOT NULL,
    PRIMARY KEY (id)
);
