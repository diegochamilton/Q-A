CREATE DATABASE sdc;
\c sdc

CREATE TABLE questions (
	id serial PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR ( 200 ),
  date_written VARCHAR ( 50 ),
  asker_name VARCHAR ( 50 ),
  asker_email VARCHAR ( 255 ) NOT NULL,
	reported BOOLEAN,
	helpful INT DEFAULT 0
);

CREATE TABLE answers (
	id serial PRIMARY KEY,
  question_id INT REFERENCES questions(id) NOT NULL,
  body VARCHAR ( 200 ),
  date_written VARCHAR ( 50 ),
  answerer_name VARCHAR ( 50 ),
  answerer_email VARCHAR ( 255 ) NOT NULL,
	reported BOOLEAN,
	helpful INT DEFAULT 0
);

CREATE TABLE photos (
	id serial PRIMARY KEY,
  answer_id INT REFERENCES answers(id) NOT NULL,
  url VARCHAR ( 300 )
);