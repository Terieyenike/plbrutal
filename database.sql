CREATE DATABASE report;

CREATE TABLE form (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  officer_name VARCHAR(100) NOT NULL,
  amount INTEGER NOT NULL,
  date_of_incident DATE NOT NULL
);