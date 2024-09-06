-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage de la structure de la base pour yala_surf
CREATE DATABASE IF NOT EXISTS `yala_surf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yala_surf`;

-- Listage de la structure de table yala_surf. AppWeb_contact
CREATE TABLE IF NOT EXISTS `AppWeb_contact` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_contact : ~0 rows (environ)
INSERT INTO `AppWeb_contact` (`id`, `first_name`, `last_name`, `email`, `message`, `created_at`) VALUES
	(1, 'Salah Eddine', 'Ouramdan', 'salahor20@gmail.com', 'test', '2024-09-04 13:04:57.789966');

-- Listage de la structure de table yala_surf. AppWeb_customuser
CREATE TABLE IF NOT EXISTS `AppWeb_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(128) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_surfer` tinyint(1) NOT NULL,
  `is_surfclub` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_customuser : ~9 rows (environ)
INSERT INTO `AppWeb_customuser` (`id`, `last_login`, `email`, `password`, `phone_number`, `address`, `is_surfer`, `is_surfclub`, `is_staff`, `is_superuser`) VALUES
	(1, '2024-09-05 02:13:55.505272', 'surf@gmail.com', 'pbkdf2_sha256$870000$1dQFYwIjysP9TAV0di31dk$k9FG2LRtGlVIg4X0QMnrCdTTFLHIjdl21uXQ+DU8u4Y=', NULL, NULL, 0, 0, 1, 1),
	(2, NULL, 'club@gmail.com', 'pbkdf2_sha256$870000$dhWi7bo7670dGihMP6TLQ3$V9AFQoPE6JVM3l86witn08bBCYmxmJ7KtKobmuyCNNA=', '06', 'club', 0, 1, 0, 0),
	(3, NULL, 'surfer@gmail.com', 'surfer', '0610750250', 'test', 1, 0, 0, 0),
	(4, NULL, 'surfer1@gmail.com', 'pbkdf2_sha256$870000$LsIs5UkkxfNWHWRLFAaFQe$9DhvZjbUr7IhlfF7k8CVHjuumDIpSd1SGggyTTTJgFA=', '0610750250', '3& bd lascrosses', 1, 0, 0, 0),
	(5, NULL, 'faical@gmail.com', 'pbkdf2_sha256$870000$VKFmV3z1aONPSU20DXS2WO$Me7HoLL4rncBdoyPz7oij7FvRBDxmIU87xwYmJxrCFc=', '0610750250', '31 bd lascrosses', 1, 0, 0, 0),
	(7, NULL, 'dd@gmail.com', 'pbkdf2_sha256$870000$1vVxA0GpacvLCbhVY3S3Ld$I0Yk8q3rKyLhTUV9kuRnoZZl4xBbxs1n7G3ABy8zFdw=', '0610750250', '3& bd lascrosses', 0, 1, 0, 0),
	(8, NULL, 'doha@gmail.com', 'pbkdf2_sha256$870000$GnruxdopuyEnhPCazFytve$vadEmjVmrDafTk7yRLzZx/nUgzfvVJFay5qWPSVy5HM=', '0610750250', '31 bd lascrosses', 1, 0, 0, 0),
	(9, NULL, 'salahor20@gmail.com', 'pbkdf2_sha256$870000$VNaGDQCT9edBi5CEKv1vvz$sfwbihtxOBJ+bU6H43cBq6vjmNzgUUWylkt5kzeV8IM=', '0610750250', '3& bd lascrosses', 1, 0, 0, 0),
	(10, NULL, 'dohatii@gmail.Com', 'pbkdf2_sha256$870000$228HLfzUw3xjHe9TLBCGzA$MuZcUsj7kjCY+2VoL9Gjav/vLYgpA42KQtjdQ6tq574=', '0610750250', '12', 1, 0, 0, 0),
	(11, NULL, 'salah.ouramdan@forum-toulouse.fr', 'pbkdf2_sha256$870000$BrlbrAePZoFep6Xj1kEEps$1Idw9G4AM74HD7r+UgZgScu8O3HNrj4eSRRQDxV5frU=', '1234', '31 bd Lascrosses', 1, 0, 0, 0);

-- Listage de la structure de table yala_surf. AppWeb_customuser_groups
CREATE TABLE IF NOT EXISTS `AppWeb_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AppWeb_customuser_groups_customuser_id_group_id_d88f841a_uniq` (`customuser_id`,`group_id`),
  KEY `AppWeb_customuser_groups_group_id_7aa7440f_fk_auth_group_id` (`group_id`),
  CONSTRAINT `AppWeb_customuser_gr_customuser_id_3a75e4ab_fk_AppWeb_cu` FOREIGN KEY (`customuser_id`) REFERENCES `AppWeb_customuser` (`id`),
  CONSTRAINT `AppWeb_customuser_groups_group_id_7aa7440f_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage de la structure de table yala_surf. AppWeb_customuser_user_permissions
CREATE TABLE IF NOT EXISTS `AppWeb_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AppWeb_customuser_user_p_customuser_id_permission_454aacc2_uniq` (`customuser_id`,`permission_id`),
  KEY `AppWeb_customuser_us_permission_id_028041c8_fk_auth_perm` (`permission_id`),
  CONSTRAINT `AppWeb_customuser_us_customuser_id_064d336c_fk_AppWeb_cu` FOREIGN KEY (`customuser_id`) REFERENCES `AppWeb_customuser` (`id`),
  CONSTRAINT `AppWeb_customuser_us_permission_id_028041c8_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage de la structure de table yala_surf. AppWeb_equipment
CREATE TABLE IF NOT EXISTS `AppWeb_equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `size` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `material_type` varchar(4) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `rent_price` decimal(10,2) DEFAULT NULL,
  `equipment_type_id` bigint NOT NULL,
  `surf_club_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_equipment_equipment_type_id_b31afc4d_fk_AppWeb_eq` (`equipment_type_id`),
  KEY `AppWeb_equipment_surf_club_id_9b0ea9c9_fk_AppWeb_surfclub_id` (`surf_club_id`),
  CONSTRAINT `AppWeb_equipment_equipment_type_id_b31afc4d_fk_AppWeb_eq` FOREIGN KEY (`equipment_type_id`) REFERENCES `AppWeb_equipmenttype` (`id`),
  CONSTRAINT `AppWeb_equipment_surf_club_id_9b0ea9c9_fk_AppWeb_surfclub_id` FOREIGN KEY (`surf_club_id`) REFERENCES `AppWeb_surfclub` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_equipment : ~2 rows (environ)
INSERT INTO `AppWeb_equipment` (`id`, `name`, `description`, `size`, `state`, `material_type`, `sale_price`, `rent_price`, `equipment_type_id`, `surf_club_id`, `quantity`) VALUES
	(10, 'derive', 'derive bon', '6"3', 'new', 'sale', 20.00, NULL, 3, 1, 4),
	(11, 'planche', '12', '123', 'used', 'sale', NULL, 30.00, 1, 1, 5);

-- Listage de la structure de table yala_surf. AppWeb_equipmentselection
CREATE TABLE IF NOT EXISTS `AppWeb_equipmentselection` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `equipment_id` bigint NOT NULL,
  `surf_lesson_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AppWeb_equipmentselectio_surf_lesson_id_equipment_b7aa86af_uniq` (`surf_lesson_id`,`equipment_id`),
  KEY `AppWeb_equipmentsele_equipment_id_a40d36bd_fk_AppWeb_eq` (`equipment_id`),
  CONSTRAINT `AppWeb_equipmentsele_equipment_id_a40d36bd_fk_AppWeb_eq` FOREIGN KEY (`equipment_id`) REFERENCES `AppWeb_equipment` (`id`),
  CONSTRAINT `AppWeb_equipmentsele_surf_lesson_id_da3724ad_fk_AppWeb_su` FOREIGN KEY (`surf_lesson_id`) REFERENCES `AppWeb_surflesson` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_equipmentselection : ~2 rows (environ)
INSERT INTO `AppWeb_equipmentselection` (`id`, `quantity`, `equipment_id`, `surf_lesson_id`) VALUES
	(10, 9, 11, 7),
	(11, 3, 11, 8);

-- Listage de la structure de table yala_surf. AppWeb_equipmenttype
CREATE TABLE IF NOT EXISTS `AppWeb_equipmenttype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_equipmenttype : ~2 rows (environ)
INSERT INTO `AppWeb_equipmenttype` (`id`, `type`) VALUES
	(1, 'surfboard'),
	(2, 'leash'),
	(3, 'surfsuit');

-- Listage de la structure de table yala_surf. AppWeb_forum
CREATE TABLE IF NOT EXISTS `AppWeb_forum` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `surf_spot_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `surf_spot_id` (`surf_spot_id`),
  CONSTRAINT `AppWeb_forum_surf_spot_id_e651e3a0_fk_AppWeb_surfspot_id` FOREIGN KEY (`surf_spot_id`) REFERENCES `AppWeb_surfspot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_forum : ~0 rows (environ)
INSERT INTO `AppWeb_forum` (`id`, `surf_spot_id`) VALUES
	(1, 1);

-- Listage de la structure de table yala_surf. AppWeb_lessonschedule
CREATE TABLE IF NOT EXISTS `AppWeb_lessonschedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL,
  `day` date NOT NULL,
  `surf_club_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_lessonschedul_surf_club_id_bdd12258_fk_AppWeb_su` (`surf_club_id`),
  CONSTRAINT `AppWeb_lessonschedul_surf_club_id_bdd12258_fk_AppWeb_su` FOREIGN KEY (`surf_club_id`) REFERENCES `AppWeb_surfclub` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_lessonschedule : ~2 rows (environ)
INSERT INTO `AppWeb_lessonschedule` (`id`, `start_time`, `end_time`, `day`, `surf_club_id`) VALUES
	(1, '16:49:00.000000', '17:52:00.000000', '2024-08-10', 1),
	(2, '18:49:00.000000', '17:49:00.000000', '2024-08-22', 1),
	(3, '14:21:00.000000', '18:18:00.000000', '2024-09-08', 1);

-- Listage de la structure de table yala_surf. AppWeb_message
CREATE TABLE IF NOT EXISTS `AppWeb_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `forum_id` bigint NOT NULL,
  `sender_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_message_forum_id_e48167f1_fk_AppWeb_forum_id` (`forum_id`),
  KEY `AppWeb_message_sender_id_8b25e2a5_fk_AppWeb_surfer_id` (`sender_id`),
  CONSTRAINT `AppWeb_message_forum_id_e48167f1_fk_AppWeb_forum_id` FOREIGN KEY (`forum_id`) REFERENCES `AppWeb_forum` (`id`),
  CONSTRAINT `AppWeb_message_sender_id_8b25e2a5_fk_AppWeb_surfer_id` FOREIGN KEY (`sender_id`) REFERENCES `AppWeb_surfer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_message : ~45 rows (environ)
INSERT INTO `AppWeb_message` (`id`, `content`, `created_at`, `forum_id`, `sender_id`) VALUES
	(1, 'hello', '2024-08-30 12:15:56.759109', 1, 1),
	(2, 'cv', '2024-08-30 12:16:01.037291', 1, 1),
	(3, 'ça va bien :', '2024-09-01 01:05:03.831574', 1, 2),
	(4, 'hello', '2024-09-01 01:08:42.444587', 1, 2),
	(5, 'cv', '2024-09-01 01:14:35.402947', 1, 2),
	(6, 'nn', '2024-09-01 01:16:21.382181', 1, 2),
	(7, 'kdksodkspokdpskpfpspfpskfpsf', '2024-09-01 01:16:31.637114', 1, 2),
	(8, 'drari ks,dks,dmsmdlqsmfl;sdm,msl,vls,msd,fls,dvmsdmvl;sù;flmz,ew,vcslc', '2024-09-01 01:17:27.631203', 1, 2),
	(9, 'hello les gars', '2024-09-03 03:11:42.266029', 1, 2),
	(10, 'ça va ?', '2024-09-03 03:11:53.253835', 1, 6),
	(11, 'oui et toi ?', '2024-09-03 03:12:01.652684', 1, 2),
	(12, 'wesh', '2024-09-03 03:13:41.713143', 1, 6),
	(13, 'cv', '2024-09-03 03:13:54.721465', 1, 2),
	(14, 'hello', '2024-09-04 11:31:10.729281', 1, 2),
	(15, 'cv', '2024-09-05 02:54:56.635772', 1, 2),
	(16, 'hello', '2024-09-05 03:02:48.162147', 1, 2),
	(17, 'cc', '2024-09-05 03:07:15.366626', 1, 2),
	(18, 'cv', '2024-09-05 03:10:37.004763', 1, 2),
	(19, 'cv', '2024-09-05 03:16:15.458568', 1, 2),
	(20, 'cc', '2024-09-05 03:18:23.381441', 1, 2),
	(21, 'cc', '2024-09-05 03:18:52.614688', 1, 2),
	(22, 'cc', '2024-09-05 03:20:55.916391', 1, 2),
	(23, 'vv', '2024-09-05 03:21:40.783721', 1, 2),
	(24, 'cc', '2024-09-05 03:22:59.198919', 1, 2),
	(25, 'cc', '2024-09-05 03:25:55.895039', 1, 2),
	(26, 'cc', '2024-09-05 03:30:15.365046', 1, 2),
	(27, 'cc', '2024-09-05 03:31:57.421012', 1, 2),
	(28, 'parfait !!', '2024-09-05 03:32:02.667182', 1, 2),
	(29, 'cv', '2024-09-05 03:34:09.516869', 1, 7),
	(30, 'oui et toi', '2024-09-05 03:34:17.883631', 1, 2),
	(31, 'cc', '2024-09-05 03:36:31.041327', 1, 2),
	(32, 'cc', '2024-09-05 03:37:52.798170', 1, 2),
	(33, 'cc', '2024-09-05 03:39:35.123468', 1, 2),
	(34, 'cc', '2024-09-05 03:42:45.508181', 1, 2),
	(35, 'cc', '2024-09-05 03:43:45.433813', 1, 2),
	(36, 'ccccc', '2024-09-05 03:44:27.766346', 1, 2),
	(37, 'nn', '2024-09-05 03:45:20.056594', 1, 2),
	(38, 'ok', '2024-09-05 03:45:31.198190', 1, 2),
	(39, 'c', '2024-09-05 03:47:33.319078', 1, 2),
	(40, 'ça va', '2024-09-05 03:47:38.979733', 1, 2),
	(41, 'oui', '2024-09-05 03:47:48.637603', 1, 2),
	(42, 'cc', '2024-09-05 03:49:34.862685', 1, 2),
	(43, 'cv', '2024-09-05 03:49:39.211714', 1, 2),
	(44, 'oui', '2024-09-05 03:49:51.763515', 1, 7),
	(45, 'cv', '2024-09-05 03:50:46.340820', 1, 2),
	(46, 'cv', '2024-09-05 03:51:06.015174', 1, 2),
	(47, 'oui et toi', '2024-09-05 03:51:53.846534', 1, 7),
	(48, 'cv', '2024-09-05 03:54:21.882843', 1, 2),
	(49, 'oui', '2024-09-05 03:54:31.303211', 1, 7),
	(50, 'cc', '2024-09-05 13:11:50.273389', 1, 7),
	(51, 'cv', '2024-09-05 13:12:02.886038', 1, 2),
	(52, 'hello', '2024-09-05 13:13:33.528309', 1, 2);

-- Listage de la structure de table yala_surf. AppWeb_monitor
CREATE TABLE IF NOT EXISTS `AppWeb_monitor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `birthday` date NOT NULL,
  `active` tinyint(1) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `surf_club_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_monitor_surf_club_id_d89f9996_fk_AppWeb_surfclub_id` (`surf_club_id`),
  CONSTRAINT `AppWeb_monitor_surf_club_id_d89f9996_fk_AppWeb_surfclub_id` FOREIGN KEY (`surf_club_id`) REFERENCES `AppWeb_surfclub` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_monitor : ~5 rows (environ)
INSERT INTO `AppWeb_monitor` (`id`, `first_name`, `last_name`, `birthday`, `active`, `photo`, `surf_club_id`) VALUES
	(1, 'Salah', 'Or', '2024-08-22', 0, 'uploads/ed-removebg-preview.png', 1),
	(2, 'Sl', 'Orll', '2024-08-13', 0, 'uploads/398788742.jpg', 1),
	(3, 'Salah Eddine', 'Ouramdan', '2024-08-29', 1, 'uploads/Salah_eCckICQ.jpg', 1),
	(4, ',,', 'kk', '2024-08-08', 0, '', 1);

-- Listage de la structure de table yala_surf. AppWeb_order
CREATE TABLE IF NOT EXISTS `AppWeb_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `surf_club_id` bigint NOT NULL,
  `surfer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_order_surf_club_id_77d1b6e3_fk_AppWeb_surfclub_id` (`surf_club_id`),
  KEY `AppWeb_order_surfer_id_17edf075_fk_AppWeb_surfer_id` (`surfer_id`),
  CONSTRAINT `AppWeb_order_surf_club_id_77d1b6e3_fk_AppWeb_surfclub_id` FOREIGN KEY (`surf_club_id`) REFERENCES `AppWeb_surfclub` (`id`),
  CONSTRAINT `AppWeb_order_surfer_id_17edf075_fk_AppWeb_surfer_id` FOREIGN KEY (`surfer_id`) REFERENCES `AppWeb_surfer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_order : ~6 rows (environ)
INSERT INTO `AppWeb_order` (`id`, `order_date`, `total_price`, `surf_club_id`, `surfer_id`) VALUES
	(1, '2024-08-30', 0.00, 1, 1),
	(2, '2024-09-01', 0.00, 1, 2),
	(3, '2024-09-03', 92.00, 1, 2),
	(4, '2024-09-03', 80.00, 1, 2),
	(5, '2024-09-03', 320.00, 1, 2),
	(6, '2024-09-03', 120.00, 1, 6),
	(7, '2024-09-04', 80.00, 1, 2);

-- Listage de la structure de table yala_surf. AppWeb_orderitem
CREATE TABLE IF NOT EXISTS `AppWeb_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `equipment_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_orderitem_equipment_id_254f74cf_fk_AppWeb_equipment_id` (`equipment_id`),
  KEY `AppWeb_orderitem_order_id_dd38b9ce_fk_AppWeb_order_id` (`order_id`),
  CONSTRAINT `AppWeb_orderitem_equipment_id_254f74cf_fk_AppWeb_equipment_id` FOREIGN KEY (`equipment_id`) REFERENCES `AppWeb_equipment` (`id`),
  CONSTRAINT `AppWeb_orderitem_order_id_dd38b9ce_fk_AppWeb_order_id` FOREIGN KEY (`order_id`) REFERENCES `AppWeb_order` (`id`),
  CONSTRAINT `AppWeb_orderitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_orderitem : ~2 rows (environ)
INSERT INTO `AppWeb_orderitem` (`id`, `quantity`, `equipment_id`, `order_id`) VALUES
	(5, 4, 10, 4),
	(6, 16, 10, 5),
	(7, 6, 10, 6),
	(8, 4, 10, 7);

-- Listage de la structure de table yala_surf. AppWeb_photo
CREATE TABLE IF NOT EXISTS `AppWeb_photo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  `surf_spot_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_photo_equipment_id_6cc8780e_fk_AppWeb_equipment_id` (`equipment_id`),
  KEY `AppWeb_photo_surf_spot_id_ccdb52fe_fk_AppWeb_surfspot_id` (`surf_spot_id`),
  CONSTRAINT `AppWeb_photo_equipment_id_6cc8780e_fk_AppWeb_equipment_id` FOREIGN KEY (`equipment_id`) REFERENCES `AppWeb_equipment` (`id`),
  CONSTRAINT `AppWeb_photo_surf_spot_id_ccdb52fe_fk_AppWeb_surfspot_id` FOREIGN KEY (`surf_spot_id`) REFERENCES `AppWeb_surfspot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_photo : ~6 rows (environ)
INSERT INTO `AppWeb_photo` (`id`, `image`, `equipment_id`, `surf_spot_id`) VALUES
	(13, 'uploads/anza.jpg', NULL, 1),
	(14, 'uploads/image1-2-3d2snrl593salnnehq8362.jpg', NULL, 1),
	(15, 'uploads/398788742.jpg', NULL, 3),
	(17, 'uploads/398788742_a3ILVUF.jpg', NULL, 2),
	(25, 'uploads/banana.png', 10, NULL),
	(26, 'uploads/banana_Em9u6Hm.png', 11, NULL);

-- Listage de la structure de table yala_surf. AppWeb_surfclub
CREATE TABLE IF NOT EXISTS `AppWeb_surfclub` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `surf_spot_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `AppWeb_surfclub_surf_spot_id_3de9033c_fk_AppWeb_surfspot_id` (`surf_spot_id`),
  CONSTRAINT `AppWeb_surfclub_surf_spot_id_3de9033c_fk_AppWeb_surfspot_id` FOREIGN KEY (`surf_spot_id`) REFERENCES `AppWeb_surfspot` (`id`),
  CONSTRAINT `AppWeb_surfclub_user_id_5f4f401e_fk_AppWeb_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `AppWeb_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_surfclub : ~2 rows (environ)
INSERT INTO `AppWeb_surfclub` (`id`, `name`, `logo`, `surf_spot_id`, `user_id`) VALUES
	(1, 'Anza Surf', 'uploads/OCP_Group_PosJytp.svg-removebg-preview.png', 2, 2),
	(2, 'dd', 'uploads/398788742.jpg', 1, 7);

-- Listage de la structure de table yala_surf. AppWeb_surfer
CREATE TABLE IF NOT EXISTS `AppWeb_surfer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `level` varchar(50) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `AppWeb_surfer_user_id_a82142b3_fk_AppWeb_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `AppWeb_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_surfer : ~4 rows (environ)
INSERT INTO `AppWeb_surfer` (`id`, `firstname`, `lastname`, `birthday`, `level`, `photo`, `user_id`) VALUES
	(1, 'test', 'test', '2024-08-21', 'intermediate', 'uploads/inscription_login_vue_OqF1ygP.png', 3),
	(2, 'mamati', 'mamati', '2024-07-01', 'intermediate', 'uploads/usms-logo-A8CBFCDE64-seeklogo.com-removebg-preview.png', 4),
	(3, 'faical', 'faical', '2024-08-14', 'beginner', '', 5),
	(5, 'tesi', 'Ouramdan', '2024-08-15', 'intermediate', 'uploads/inscription_login_vue.png', 9),
	(6, 'dohati', 'dohati', '2024-09-27', 'advanced', '', 10),
	(7, 'Salah Eddine', 'Ouramdan', '2024-09-04', 'beginner', 'uploads/pexels-wendywei-1667004.jpg', 11);

-- Listage de la structure de table yala_surf. AppWeb_surflesson
CREATE TABLE IF NOT EXISTS `AppWeb_surflesson` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `surfer_id` bigint NOT NULL,
  `surf_session_id` bigint NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_surflesson_surf_session_id_4c72dfe7_fk_AppWeb_su` (`surf_session_id`),
  KEY `AppWeb_surflesson_surfer_id_f480a762_fk_AppWeb_surfer_id` (`surfer_id`),
  CONSTRAINT `AppWeb_surflesson_surf_session_id_4c72dfe7_fk_AppWeb_su` FOREIGN KEY (`surf_session_id`) REFERENCES `AppWeb_surfsession` (`id`),
  CONSTRAINT `AppWeb_surflesson_surfer_id_f480a762_fk_AppWeb_surfer_id` FOREIGN KEY (`surfer_id`) REFERENCES `AppWeb_surfer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_surflesson : ~1 rows (environ)
INSERT INTO `AppWeb_surflesson` (`id`, `surfer_id`, `surf_session_id`, `total_price`) VALUES
	(7, 2, 10, 270.00),
	(8, 2, 10, 90.00);

-- Listage de la structure de table yala_surf. AppWeb_surfsession
CREATE TABLE IF NOT EXISTS `AppWeb_surfsession` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_schedule_id` bigint NOT NULL,
  `monitor_id` bigint NOT NULL,
  `surf_club_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AppWeb_surfsession_lesson_schedule_id_196d0ea4_fk_AppWeb_le` (`lesson_schedule_id`),
  KEY `AppWeb_surfsession_monitor_id_0f1a8e64_fk_AppWeb_monitor_id` (`monitor_id`),
  KEY `AppWeb_surfsession_surf_club_id_bd4b6262_fk_AppWeb_surfclub_id` (`surf_club_id`),
  CONSTRAINT `AppWeb_surfsession_lesson_schedule_id_196d0ea4_fk_AppWeb_le` FOREIGN KEY (`lesson_schedule_id`) REFERENCES `AppWeb_lessonschedule` (`id`),
  CONSTRAINT `AppWeb_surfsession_monitor_id_0f1a8e64_fk_AppWeb_monitor_id` FOREIGN KEY (`monitor_id`) REFERENCES `AppWeb_monitor` (`id`),
  CONSTRAINT `AppWeb_surfsession_surf_club_id_bd4b6262_fk_AppWeb_surfclub_id` FOREIGN KEY (`surf_club_id`) REFERENCES `AppWeb_surfclub` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_surfsession : ~2 rows (environ)
INSERT INTO `AppWeb_surfsession` (`id`, `lesson_schedule_id`, `monitor_id`, `surf_club_id`) VALUES
	(10, 1, 1, 1),
	(11, 1, 3, 1);

-- Listage de la structure de table yala_surf. AppWeb_surfspot
CREATE TABLE IF NOT EXISTS `AppWeb_surfspot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.AppWeb_surfspot : ~3 rows (environ)
INSERT INTO `AppWeb_surfspot` (`id`, `name`, `zip_code`, `address`, `description`, `latitude`, `longitude`) VALUES
	(1, 'Anza', '123', '31 bd lascrosses', 'La Pointe des Ancres (30.545044, -9.725805) est un spot de surf au Nord du village de Taghazout. C’est une droite de classe mondiale qui fonctionne avec une houle de grande période orientée Nord Ouest. Découverte  par des Australiens dans les années 1960,\r\n c’est un graal pour les surfers confirmés qui voyagent au Maroc. Le take off est difficile  mais si vous avez de la chance, une vague tubulaire s’offrira à vous le long de la pointe.', 36.538592, -4.620813),
	(2, 'Bouznika', '123', '31 bd lascrosses', 'Joli spot', 1234, 1234),
	(3, 'Taghazout', '1234', '31 bd lascrosses', 'ghlo', 789, 987);

-- Listage de la structure de table yala_surf. auth_group
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.auth_group : ~0 rows (environ)

-- Listage de la structure de table yala_surf. auth_group_permissions
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.auth_group_permissions : ~0 rows (environ)

-- Listage de la structure de table yala_surf. auth_permission
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.auth_permission : ~84 rows (environ)
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can view log entry', 1, 'view_logentry'),
	(5, 'Can add permission', 2, 'add_permission'),
	(6, 'Can change permission', 2, 'change_permission'),
	(7, 'Can delete permission', 2, 'delete_permission'),
	(8, 'Can view permission', 2, 'view_permission'),
	(9, 'Can add group', 3, 'add_group'),
	(10, 'Can change group', 3, 'change_group'),
	(11, 'Can delete group', 3, 'delete_group'),
	(12, 'Can view group', 3, 'view_group'),
	(13, 'Can add content type', 4, 'add_contenttype'),
	(14, 'Can change content type', 4, 'change_contenttype'),
	(15, 'Can delete content type', 4, 'delete_contenttype'),
	(16, 'Can view content type', 4, 'view_contenttype'),
	(17, 'Can add session', 5, 'add_session'),
	(18, 'Can change session', 5, 'change_session'),
	(19, 'Can delete session', 5, 'delete_session'),
	(20, 'Can view session', 5, 'view_session'),
	(21, 'Can add equipment', 6, 'add_equipment'),
	(22, 'Can change equipment', 6, 'change_equipment'),
	(23, 'Can delete equipment', 6, 'delete_equipment'),
	(24, 'Can view equipment', 6, 'view_equipment'),
	(25, 'Can add equipment type', 7, 'add_equipmenttype'),
	(26, 'Can change equipment type', 7, 'change_equipmenttype'),
	(27, 'Can delete equipment type', 7, 'delete_equipmenttype'),
	(28, 'Can view equipment type', 7, 'view_equipmenttype'),
	(29, 'Can add forum', 8, 'add_forum'),
	(30, 'Can change forum', 8, 'change_forum'),
	(31, 'Can delete forum', 8, 'delete_forum'),
	(32, 'Can view forum', 8, 'view_forum'),
	(33, 'Can add order', 9, 'add_order'),
	(34, 'Can change order', 9, 'change_order'),
	(35, 'Can delete order', 9, 'delete_order'),
	(36, 'Can view order', 9, 'view_order'),
	(37, 'Can add surf club', 10, 'add_surfclub'),
	(38, 'Can change surf club', 10, 'change_surfclub'),
	(39, 'Can delete surf club', 10, 'delete_surfclub'),
	(40, 'Can view surf club', 10, 'view_surfclub'),
	(41, 'Can add surfer', 11, 'add_surfer'),
	(42, 'Can change surfer', 11, 'change_surfer'),
	(43, 'Can delete surfer', 11, 'delete_surfer'),
	(44, 'Can view surfer', 11, 'view_surfer'),
	(45, 'Can add surf spot', 12, 'add_surfspot'),
	(46, 'Can change surf spot', 12, 'change_surfspot'),
	(47, 'Can delete surf spot', 12, 'delete_surfspot'),
	(48, 'Can view surf spot', 12, 'view_surfspot'),
	(49, 'Can add equipment selection', 13, 'add_equipmentselection'),
	(50, 'Can change equipment selection', 13, 'change_equipmentselection'),
	(51, 'Can delete equipment selection', 13, 'delete_equipmentselection'),
	(52, 'Can view equipment selection', 13, 'view_equipmentselection'),
	(53, 'Can add order item', 14, 'add_orderitem'),
	(54, 'Can change order item', 14, 'change_orderitem'),
	(55, 'Can delete order item', 14, 'delete_orderitem'),
	(56, 'Can view order item', 14, 'view_orderitem'),
	(57, 'Can add monitor', 15, 'add_monitor'),
	(58, 'Can change monitor', 15, 'change_monitor'),
	(59, 'Can delete monitor', 15, 'delete_monitor'),
	(60, 'Can view monitor', 15, 'view_monitor'),
	(61, 'Can add lesson schedule', 16, 'add_lessonschedule'),
	(62, 'Can change lesson schedule', 16, 'change_lessonschedule'),
	(63, 'Can delete lesson schedule', 16, 'delete_lessonschedule'),
	(64, 'Can view lesson schedule', 16, 'view_lessonschedule'),
	(65, 'Can add message', 17, 'add_message'),
	(66, 'Can change message', 17, 'change_message'),
	(67, 'Can delete message', 17, 'delete_message'),
	(68, 'Can view message', 17, 'view_message'),
	(69, 'Can add surf lesson', 18, 'add_surflesson'),
	(70, 'Can change surf lesson', 18, 'change_surflesson'),
	(71, 'Can delete surf lesson', 18, 'delete_surflesson'),
	(72, 'Can view surf lesson', 18, 'view_surflesson'),
	(73, 'Can add surf session', 19, 'add_surfsession'),
	(74, 'Can change surf session', 19, 'change_surfsession'),
	(75, 'Can delete surf session', 19, 'delete_surfsession'),
	(76, 'Can view surf session', 19, 'view_surfsession'),
	(77, 'Can add photo', 20, 'add_photo'),
	(78, 'Can change photo', 20, 'change_photo'),
	(79, 'Can delete photo', 20, 'delete_photo'),
	(80, 'Can view photo', 20, 'view_photo'),
	(81, 'Can add custom user', 21, 'add_customuser'),
	(82, 'Can change custom user', 21, 'change_customuser'),
	(83, 'Can delete custom user', 21, 'delete_customuser'),
	(84, 'Can view custom user', 21, 'view_customuser'),
	(85, 'Can add contact', 22, 'add_contact'),
	(86, 'Can change contact', 22, 'change_contact'),
	(87, 'Can delete contact', 22, 'delete_contact'),
	(88, 'Can view contact', 22, 'view_contact');

-- Listage de la structure de table yala_surf. django_admin_log
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_AppWeb_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_AppWeb_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `AppWeb_customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.django_admin_log : ~19 rows (environ)
INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
	(1, '2024-08-30 11:47:42.068088', '1', 'SurfSpot object (1)', 1, '[{"added": {}}]', 12, 1),
	(2, '2024-08-30 11:48:04.841565', '1', 'Photo of Anza', 1, '[{"added": {}}]', 20, 1),
	(3, '2024-08-30 11:48:13.052844', '2', 'Photo of Anza', 1, '[{"added": {}}]', 20, 1),
	(4, '2024-08-30 11:56:52.706362', '1', 'EquipmentType object (1)', 1, '[{"added": {}}]', 7, 1),
	(5, '2024-08-30 11:56:56.835006', '2', 'EquipmentType object (2)', 1, '[{"added": {}}]', 7, 1),
	(6, '2024-08-30 11:57:00.870614', '3', 'EquipmentType object (3)', 1, '[{"added": {}}]', 7, 1),
	(7, '2024-08-30 12:15:47.154919', '1', 'Forum for Anza', 1, '[{"added": {}}]', 8, 1),
	(8, '2024-08-30 18:01:37.730282', '3', 'surfer@gmail.com', 2, '[{"changed": {"fields": ["Password"]}}]', 21, 1),
	(9, '2024-08-30 18:01:51.714710', '3', 'surfer@gmail.com', 2, '[]', 21, 1),
	(10, '2024-08-31 01:05:36.686864', '9', 'Photo of derive FS', 1, '[{"added": {}}]', 20, 1),
	(11, '2024-08-31 12:51:17.920483', '2', 'SurfSpot object (2)', 1, '[{"added": {}}]', 12, 1),
	(12, '2024-08-31 12:56:03.148047', '2', 'Photo of Anza', 3, '', 20, 1),
	(13, '2024-08-31 12:56:07.004434', '1', 'Photo of Anza', 3, '', 20, 1),
	(14, '2024-08-31 12:57:26.868433', '13', 'Photo of Anza', 1, '[{"added": {}}]', 20, 1),
	(15, '2024-08-31 13:19:20.895601', '14', 'Photo of Anza', 1, '[{"added": {}}]', 20, 1),
	(16, '2024-08-31 13:52:28.612653', '3', 'SurfSpot object (3)', 1, '[{"added": {}}]', 12, 1),
	(17, '2024-08-31 13:52:48.987625', '15', 'Photo of Taghazout', 1, '[{"added": {}}]', 20, 1),
	(18, '2024-08-31 15:01:34.072469', '11', 'Photo of derive FS', 2, '[{"changed": {"fields": ["Image"]}}]', 20, 1),
	(19, '2024-08-31 15:40:20.579873', '12', 'Photo of test', 3, '', 20, 1),
	(20, '2024-08-31 15:40:30.238994', '16', 'Photo of test', 1, '[{"added": {}}]', 20, 1),
	(21, '2024-08-31 15:58:42.923284', '5', 'Photo of combine', 2, '[{"changed": {"fields": ["Image"]}}]', 20, 1),
	(22, '2024-08-31 15:58:50.913399', '8', 'Photo of planche de surf', 2, '[{"changed": {"fields": ["Image"]}}]', 20, 1),
	(23, '2024-08-31 22:55:15.346283', '17', 'Photo of Bouznika', 1, '[{"added": {}}]', 20, 1),
	(24, '2024-09-02 23:59:06.080186', '18', 'Photo of test', 1, '[{"added": {}}]', 20, 1),
	(25, '2024-09-05 02:14:34.812654', '25', 'Photo of derive', 1, '[{"added": {}}]', 20, 1),
	(26, '2024-09-05 02:14:42.882657', '26', 'Photo of planche', 1, '[{"added": {}}]', 20, 1);

-- Listage de la structure de table yala_surf. django_content_type
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.django_content_type : ~21 rows (environ)
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(1, 'admin', 'logentry'),
	(22, 'AppWeb', 'contact'),
	(21, 'AppWeb', 'customuser'),
	(6, 'AppWeb', 'equipment'),
	(13, 'AppWeb', 'equipmentselection'),
	(7, 'AppWeb', 'equipmenttype'),
	(8, 'AppWeb', 'forum'),
	(16, 'AppWeb', 'lessonschedule'),
	(17, 'AppWeb', 'message'),
	(15, 'AppWeb', 'monitor'),
	(9, 'AppWeb', 'order'),
	(14, 'AppWeb', 'orderitem'),
	(20, 'AppWeb', 'photo'),
	(10, 'AppWeb', 'surfclub'),
	(11, 'AppWeb', 'surfer'),
	(18, 'AppWeb', 'surflesson'),
	(19, 'AppWeb', 'surfsession'),
	(12, 'AppWeb', 'surfspot'),
	(3, 'auth', 'group'),
	(2, 'auth', 'permission'),
	(4, 'contenttypes', 'contenttype'),
	(5, 'sessions', 'session');

-- Listage de la structure de table yala_surf. django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table yala_surf.django_migrations : ~19 rows (environ)
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'contenttypes', '0001_initial', '2024-08-30 11:30:37.391783'),
	(2, 'contenttypes', '0002_remove_content_type_name', '2024-08-30 11:30:37.454518'),
	(3, 'auth', '0001_initial', '2024-08-30 11:30:37.674138'),
	(4, 'auth', '0002_alter_permission_name_max_length', '2024-08-30 11:30:37.737145'),
	(5, 'auth', '0003_alter_user_email_max_length', '2024-08-30 11:30:37.737145'),
	(6, 'auth', '0004_alter_user_username_opts', '2024-08-30 11:30:37.737145'),
	(7, 'auth', '0005_alter_user_last_login_null', '2024-08-30 11:30:37.752783'),
	(8, 'auth', '0006_require_contenttypes_0002', '2024-08-30 11:30:37.752783'),
	(9, 'auth', '0007_alter_validators_add_error_messages', '2024-08-30 11:30:37.752783'),
	(10, 'auth', '0008_alter_user_username_max_length', '2024-08-30 11:30:37.752783'),
	(11, 'auth', '0009_alter_user_last_name_max_length', '2024-08-30 11:30:37.769238'),
	(12, 'auth', '0010_alter_group_name_max_length', '2024-08-30 11:30:37.784283'),
	(13, 'auth', '0011_update_proxy_permissions', '2024-08-30 11:30:37.784283'),
	(14, 'auth', '0012_alter_user_first_name_max_length', '2024-08-30 11:30:37.799948'),
	(15, 'AppWeb', '0001_initial', '2024-08-30 11:30:39.771439'),
	(16, 'admin', '0001_initial', '2024-08-30 11:30:39.919231'),
	(17, 'admin', '0002_logentry_remove_auto_add', '2024-08-30 11:30:39.930241'),
	(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-08-30 11:30:39.947180'),
	(19, 'sessions', '0001_initial', '2024-08-30 11:30:39.993759'),
	(20, 'AppWeb', '0002_equipment_quantity', '2024-09-03 02:07:55.912553'),
	(21, 'AppWeb', '0003_remove_equipment_is_rent_remove_equipment_is_sell', '2024-09-03 02:16:49.122989'),
	(22, 'AppWeb', '0004_surflesson_total_price', '2024-09-03 02:52:34.746170'),
	(23, 'AppWeb', '0005_contact', '2024-09-04 12:47:23.750364');

-- Listage de la structure de table yala_surf. django_session
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Listage des données de la table yala_surf.django_session : ~1 rows (environ)
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
	('kyzyuoo2vfjuu74kyhzjyix7ygvgcnhh', '.eJxVjEsOwjAMBe-SNYr6sR3Mkn3PEDm1QwqolfpZIe4OlbqA7ZuZ93JRtrXEbbE5Duournan3y1J_7BxB3qX8Tb5fhrXeUh-V_xBF99Nas_r4f4dFFnKt0YiocAhcdWqgeZaqwRNw2cDaSkgcq9MwrWFijIDtQiIhJm1AQP3_gDFvDbd:1sk04f:8mMVJEfxGm_MOjYhQle4vctBTtWRJ3XO5P7N36voUO0', '2024-09-13 11:45:53.004389'),
	('zmygkx14scg3h2xnp3nni51197pzm1o1', '.eJxVjEsOwjAMBe-SNYr6sR3Mkn3PEDm1QwqolfpZIe4OlbqA7ZuZ93JRtrXEbbE5Duournan3y1J_7BxB3qX8Tb5fhrXeUh-V_xBF99Nas_r4f4dFFnKt0YiocAhcdWqgeZaqwRNw2cDaSkgcq9MwrWFijIDtQiIhJm1AQP3_gDFvDbd:1sknZn:vQjtikvChY5hbtAtdQ1yiMWOtuHuX7RDe56t9z21Xak', '2024-09-15 16:37:19.358038');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
