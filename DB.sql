SET sql_mode = 'STRICT_ALL_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

DROP USER IF EXISTS 'prototype_app_user'@'localhost';
CREATE USER 'prototype_app_user'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'loremipsum11453';

DROP SCHEMA IF EXISTS prototype_app_schema;
CREATE SCHEMA prototype_app_schema;

GRANT EXECUTE ON prototype_app_schema.* TO 'prototype_app_user'@'localhost';

USE prototype_app_schema;

DROP TABLE IF EXISTS plants;
CREATE TABLE plants (
 `uuid` BIGINT NOT NULL PRIMARY KEY,
  `id`   INT,
  `name` VARCHAR(64) NOT NULL,
  `last_water` VARCHAR(64),
  `status` VARCHAR(64),
  `birthday` VARCHAR(64),
  `notes` TINYTEXT
);

DELIMITER $$
CREATE PROCEDURE `create_plant`(IN pid INT, IN cname VARCHAR(64), IN pstatus VARCHAR(64))
BEGIN
  INSERT INTO `plants` (`uuid`, `id`, `name`, `last_water`, `status`,`birthday`)
	VALUES (uuid_short(),`pid`, `cname`, null , `pstatus`, curdate());
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `delete_plant`(IN pid BIGINT)
BEGIN
  DELETE FROM `plants`
  WHERE `uuid` = pid;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `list_plants`()
BEGIN
  SELECT `uuid`, `id`, `name`, `last_water`, `status`, `birthday`, `notes` FROM `plants`;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `update_status`(IN pid BIGINT, IN newStatus VARCHAR(64))
BEGIN
	UPDATE `plants`
    SET `status` = `newStatus`
    WHERE `uuid` = pid;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `water_plant`(IN pid BIGINT, IN theDate VARCHAR(64))
BEGIN
	UPDATE `plants`
    SET `last_water` = `theDate`
    WHERE `uuid` = pid;
END$$
DELIMITER ;

DELIMITER // 
CREATE PROCEDURE `add_note`(IN pid BIGINT, IN note TINYTEXT)
BEGIN
	UPDATE `plants`
    SET `notes` = `note`
    WHERE `uuid` = pid;

END //
DELIMITER ;

DELIMITER // 
CREATE PROCEDURE `get_note`(IN pid BIGINT)
BEGIN
	SELECT `notes`
    FROM `plants`
    WHERE `uuid` = pid;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `rename_plant`(IN pid BIGINT, IN newName VARCHAR(64))
BEGIN
	UPDATE `plants`
    SET `name` = `newName`
    WHERE `uuid` = `pid`;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `get_indvidual_plant`(IN pid BIGINT)
BEGIN
	SELECT `uuid`, `id`, `name`, `last_water`, `status`, `birthday`, `notes` 
    FROM `plants`
    WHERE `uuid` = `pid`;
END //
DELIMITER ; 