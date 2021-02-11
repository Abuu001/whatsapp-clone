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

INSERT INTO whatsappMainMessages(messages, time_sent,name)VALUES ('blue', '12:00 PM', 'kim v') RETURNING *;

ALTER TABLE whatsappMainMessages ALTER COLUMN time_sent  TYPE  TIME DEFAULT CURRENT_TIME(1);

SELECT * FROM whatsappmainmessages ORDER BY  time_sent ASC;

ALTER TABLE whatsappMainMessages ALTER COLUMN messages  TYPE  TIME DEFAULT CURRENT_TIME(1);

SELECT * FROM whatsappmainmessages  WHERE messages IS NOT NULL  OR messages !="";

  CREATE FUNCTION notify_trigger() RETURNS trigger AS $$
    DECLARE
    BEGIN
      PERFORM pg_notify('watch_whatsappmainmessages', row_to_json(NEW)::text);
      RETURN new;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER watch_whatsappmainmessages_trigger AFTER INSERT ON whatsappmainmessages
    FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

    CREATE TRIGGER watch_whatsappmainmessages AFTER INSERT ON whatsappmainmessages
    FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

     CREATE TRIGGER watch_whatsappmainmessages_delete AFTER DELETE ON whatsappmainmessages
    FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

    ALTER TABLE whatsappMainMessages ALTER COLUMN time_sent DROP DEFAULT;
    ALTER TABLE whatsappMainMessages ALTER COLUMN time_sent TYPE VARCHAR(10)   ;

 CREATE TABLE whatsappimages(
     groups_id  BIGSERIAL PRIMARY KEY,
     image_name VARCHAR(255) ,
     images_path VARCHAR(255) 
  );

CREATE TABLE whatsappMainMessages(
    id uuid  DEFAULT  uuid_generate_v4 () ,
    groups BIGSERIAL PRIMARY KEY NOT NULL ,
    messages  VARCHAR(255) NOT NULL,
    time_sent  VARCHAR(17) ,
   name  VARCHAR(20) NOT NULL
);

  INSERT INTO whatsappimages (sender_name,time_sent,images) VALUES ('Mokat','2:04 PM','/media/lugonzo/New Volume/Web projects/React/whatsapp-clone/client/src/uploads/fall.jpg');
  SELECT messages,groups,groups_id,images FROM whatsappmainmessages RIGHT JOIN whatsappimages ON whatsappimages.groups_id = whatsappmainmessages.groups;

