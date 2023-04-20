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
  `last_water` VARCHAR(64) NOT NULL
);
CREATE TABLE nursery (
	`baby_uuid` BIGINT NOT NULL PRIMARY KEY,
    `baby_id` INT,
    `baby_name` VARCHAR(64) NOT NULL,
    `date_created` date
);
CREATE TABLE graveyard (
	`dead_uuid` BIGINT PRIMARY KEY,
	`deceased` VARCHAR(64) NOT NULL
);

DROP PROCEDURE IF EXISTS create_plant;
DELIMITER //
CREATE PROCEDURE create_plant(IN pid INT, IN cname VARCHAR(64))
BEGIN
  INSERT INTO `plants` (`uuid`, `id`, `name`, `last_water`)
	VALUES (uuid_short(),`pid`, `cname`, 'N/A');
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `create_baby`;
DELIMITER //
CREATE PROCEDURE create_baby(IN pid INT, IN cname VARCHAR(64))
BEGIN
  INSERT INTO `nursery` (`baby_uuid`, `baby_id`, `baby_name`, `date_created`)
	VALUES (uuid_short(),`pid`, `cname`, now());
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `water_plant`;
DELIMITER //
CREATE PROCEDURE water_plant(IN pid BIGINT, cname VARCHAR(64))
BEGIN
	UPDATE `plants`
    SET `last_water` = cname
    WHERE `uuid` = pid;
END //
DELIMITER ; 

DROP PROCEDURE IF EXISTS `list_plants`;
DELIMITER //
CREATE PROCEDURE `list_plants`()
BEGIN
  SELECT `uuid`, `id`, `name`, `last_water` FROM `plants`;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `list_nursery`;
DELIMITER //
CREATE PROCEDURE `list_nursery`()
BEGIN
  SELECT `baby_uuid`, `baby_id`, `baby_name`, `date_created` FROM `nursery`;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `delete_plant`;
DELIMITER //
CREATE PROCEDURE `delete_plant`(IN pid BIGINT)
BEGIN
  DELETE FROM `plants`
  WHERE `uuid` = pid;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `delete_baby`;
DELIMITER //
CREATE PROCEDURE `delete_baby`(IN pid BIGINT)
BEGIN
  DELETE FROM `nursery`
  WHERE `baby_uuid` = pid;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `list_graveyard`;
DELIMITER //
CREATE PROCEDURE `list_graveyard`()
BEGIN
  SELECT `dead_uuid`, `deceased` FROM `graveyard`;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `move_to_graveyard`;
DELIMITER //
CREATE PROCEDURE `move_to_graveyard`(IN pid BIGINT)
BEGIN
  INSERT INTO `graveyard` (`dead_uuid`, `deceased`)
  SELECT `uuid`, `name`
  FROM `plants`
  WHERE `uuid`=`pid`;
  
  DELETE FROM `plants`
  WHERE `uuid` = pid;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `delete_dead`;
DELIMITER //
CREATE PROCEDURE `delete_dead`(IN pid BIGINT)
BEGIN
  DELETE FROM `graveyard`
  WHERE `dead_uuid` = pid;
END //
DELIMITER ;


