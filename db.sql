CREATE DATABASE whatsappYo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE whatsappMainMessages(
    id uuid  DEFAULT  uuid_generate_v4 () ,
    groups BIGSERIAL PRIMARY KEY NOT NULL ,
    messages  VARCHAR(255) NOT NULL,
    time_sent  TIME DEFAULT CURRENT_TIME(1) ,
    image_sent BYTEA
);

ALTER TABLE whatsappMainMessages ADD COLUMN name VARCHAR(20) NOT NULL;

INSERT INTO table_name(column1, column2, …)VALUES (value1, value2, …);

INSERT INTO whatsappMainMessages(messages, image_sent,name)VALUES ('waah', '', 'viky') RETURNING *;

ALTER TABLE whatsappMainMessages ALTER COLUMN time_sent  TYPE  TIME DEFAULT CURRENT_TIME(1);