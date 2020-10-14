-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: handyman
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(2) DEFAULT NULL,
  `postal_code` varchar(6) DEFAULT NULL,
  `used_address` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`address_id`,`user_id`),
  CONSTRAINT `user_id_address_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,1,'22 Rochman blvd','Scarborough','ON','M1H1S5','Y'),(2,2,'34 Progress Ave','Scarborough','ON','M1H1S8','Y'),(3,3,'30 Progress Ave','Scarborough','ON','M1H1S2','Y'),(4,4,'35 Rochman blvd','Scarborough','ON','M1H1S6','Y');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `user_id_customer_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('O0001',3,'Taylor','Freer','6474325464'),('O0002',4,'Hailey','Adams','6478734464');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`handymanadmin`@`localhost`*/ /*!50003 TRIGGER `customer_BEFORE_INSERT` BEFORE INSERT ON `customer` FOR EACH ROW
BEGIN
	INSERT INTO customer_seq VALUES ();
	SET NEW.customer_id = CONCAT('O', LPAD(LAST_INSERT_ID(), 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `customer_seq`
--

DROP TABLE IF EXISTS `customer_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_seq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_seq`
--

LOCK TABLES `customer_seq` WRITE;
/*!40000 ALTER TABLE `customer_seq` DISABLE KEYS */;
INSERT INTO `customer_seq` VALUES (1),(2);
/*!40000 ALTER TABLE `customer_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handyman`
--

DROP TABLE IF EXISTS `handyman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handyman` (
  `handyman_id` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  `work_avaliable_area` double DEFAULT NULL,
  PRIMARY KEY (`handyman_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `user_id_handyman_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handyman`
--

LOCK TABLES `handyman` WRITE;
/*!40000 ALTER TABLE `handyman` DISABLE KEYS */;
INSERT INTO `handyman` VALUES ('H0001',1,'Ashley','Freer','6471234343',NULL),('H0002',2,'James','Mcdonald','6471234343',NULL);
/*!40000 ALTER TABLE `handyman` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`handymanadmin`@`localhost`*/ /*!50003 TRIGGER `handyman`.`handyman_BEFORE_INSERT` BEFORE INSERT ON `handyman` FOR EACH ROW
BEGIN
	INSERT INTO handyman_seq VALUES ();
	SET NEW.handyman_id = CONCAT('H', LPAD(LAST_INSERT_ID(), 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `handyman_ability`
--

DROP TABLE IF EXISTS `handyman_ability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handyman_ability` (
  `handyman_ability_id` int(11) NOT NULL AUTO_INCREMENT,
  `handyman_id` varchar(5) NOT NULL,
  `ability_skill_id` int(11) NOT NULL,
  `skill_license_no` varchar(45) DEFAULT NULL,
  `license_issued_date` datetime DEFAULT NULL,
  PRIMARY KEY (`handyman_ability_id`),
  KEY `category_id_fk_idx` (`ability_skill_id`),
  KEY `handyman_id_fk` (`handyman_id`),
  CONSTRAINT `handyman_id_fk` FOREIGN KEY (`handyman_id`) REFERENCES `handyman` (`handyman_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `handyman_skill_id_fk` FOREIGN KEY (`ability_skill_id`) REFERENCES `skill` (`skill_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handyman_ability`
--

LOCK TABLES `handyman_ability` WRITE;
/*!40000 ALTER TABLE `handyman_ability` DISABLE KEYS */;
INSERT INTO `handyman_ability` VALUES (1,'H0001',1,'253-775050','2001-01-01 00:00:00'),(2,'H0002',2,'454-000391','2008-01-01 00:00:00');
/*!40000 ALTER TABLE `handyman_ability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handyman_seq`
--

DROP TABLE IF EXISTS `handyman_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handyman_seq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handyman_seq`
--

LOCK TABLES `handyman_seq` WRITE;
/*!40000 ALTER TABLE `handyman_seq` DISABLE KEYS */;
INSERT INTO `handyman_seq` VALUES (1),(2);
/*!40000 ALTER TABLE `handyman_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(5) NOT NULL,
  `request_date` datetime NOT NULL,
  `address_id` int(11) NOT NULL,
  `total_cost` decimal(10,0) unsigned zerofill DEFAULT NULL,
  `request_status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `customer_id_fk_idx` (`customer_id`),
  KEY `adress_id_fk_idx` (`address_id`),
  CONSTRAINT `request_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_detail`
--

DROP TABLE IF EXISTS `request_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_detail` (
  `request_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `cost` decimal(10,0) unsigned zerofill DEFAULT NULL,
  `handyman_id` varchar(5) DEFAULT NULL,
  `request_staus_id` int(11) DEFAULT NULL,
  `expected_work_date` datetime DEFAULT NULL,
  `fixed_date` datetime DEFAULT NULL,
  PRIMARY KEY (`request_detail_id`,`request_id`),
  KEY `request_id_fk_idx` (`request_id`),
  KEY `service_id_fk_idx` (`service_id`),
  KEY `request_status_id_fk_idx` (`request_staus_id`),
  KEY `handyman_id_fk_idx` (`handyman_id`),
  CONSTRAINT `handyman_id_request_detail_fk` FOREIGN KEY (`handyman_id`) REFERENCES `handyman` (`handyman_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `request_id_fk` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `request_service_id_fk` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `request_status_id_fk` FOREIGN KEY (`request_staus_id`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_detail`
--

LOCK TABLES `request_detail` WRITE;
/*!40000 ALTER TABLE `request_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(5) NOT NULL,
  `booking_detail_id` int(11) DEFAULT NULL,
  `rate_handyman` int(1) unsigned zerofill DEFAULT NULL,
  `rate_satisfied` int(1) unsigned zerofill DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `review_id_fk_idx` (`booking_detail_id`),
  KEY `customer_id_review_fk_idx` (`customer_id`),
  CONSTRAINT `customer_id_review_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `review_id_fk` FOREIGN KEY (`booking_detail_id`) REFERENCES `request_detail` (`request_detail_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(45) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Electronics'),(2,'Plumbing');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `skill_name` varchar(45) NOT NULL,
  `skill_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`skill_id`),
  KEY `skill_service_id_fk_idx` (`service_id`),
  CONSTRAINT `skill_service_id_fk` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,1,'Electrician','Best Electrician in Ontario'),(2,2,'Plumber','Best plumbing in Ontario');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `user_type` int(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_type_fk_idx` (`user_type`),
  CONSTRAINT `user_type_fk` FOREIGN KEY (`user_type`) REFERENCES `user_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ashley','h123','ashley@gmail.com',2),(2,'james','h123','james@gmail.com',2),(3,'taylor','o123','taylor@gmail.com',1),(4,'hailey','o123','hailey@gmail.com',1),(5,'tom','h123','Email',1),(6,'Helia','This is From visual Studio','Email',1),(7,'neeti','testing','neeti.patel90@gmail.com',1),(8,'Neeti','test','t@c.com',1),(9,'VueTest','test','test@test.com',1),(10,'Soukhee Lee','Plmokn12#$','BillyLee96312@gmail.com',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type` (
  `type_id` int(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'HomeOwner'),(2,'HandyMan');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-07 21:45:11
