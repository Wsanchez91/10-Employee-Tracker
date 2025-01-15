DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

\c company;

-- CONVERT THE FOLLOWING INTO 3RD NORMAL FORM STANDARDIZATION --
CREATE TABLE businesses (
    business_id INTEGER PRIMARY KEY,
    business_name VARCHAR(255)
);

CREATE TABLE locations (
   location_id INTEGER PRIMARY KEY,
    location_name VARCHAR(255),
    location_manager VARCHAR(255) 
);


CREATE TABLE companies (
    companies_id SERIAL PRIMARY KEY,
    business_id INTEGER,
    location_id INTEGER,
FOREIGN KEY (business_id) REFERENCES businesses(business_id),
FOREIGN Key (location_id) REFERENCES locations(location_id)
);