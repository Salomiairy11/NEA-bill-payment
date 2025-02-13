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

After creating these tables, make sure you enter some data into your demandtype and branches table, then use this query to register an admin straight from your db as my register form doesnt allow admin registration. 

INSERT INTO login (email, password, usertype, customer_id, sc_no, address, phoneNo, branch_id, demandType)
VALUES ('admin@example.com', 'passwordPASS123', 'admin', 
        'CUSTA1B2C3', 'SCD4E5F6', 'Admin address', '1234567890', 1, '15A'); <--here 1 refers to branch id, you write whatevr value you have enytered fro branchid in your branches table, and same goes for dmandType)
