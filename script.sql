-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.2.13-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para proyectoed2
CREATE DATABASE IF NOT EXISTS `proyectoed2` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;
USE `proyectoed2`;

-- Volcando estructura para tabla proyectoed2.hibernate_sequence
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Volcando datos para la tabla proyectoed2.hibernate_sequence: 2 rows
DELETE FROM `hibernate_sequence`;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` (`next_val`) VALUES
	(1),
	(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoed2.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `latitude` decimal(12,10) NOT NULL,
  `longitude` decimal(13,10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Volcando datos para la tabla proyectoed2.location: ~27 rows (aproximadamente)
DELETE FROM `location`;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `name`, `latitude`, `longitude`) VALUES
	(1, 'Castle Black', 60.9026200319, 10.2832031250),
	(2, 'Winterfell', 43.7512988046, -2.9443359375),
	(3, 'White Harbor', 29.1789460616, 5.8886718750),
	(4, 'Gray Water', 10.4261539948, -6.2157323536),
	(5, 'Ironman Bay', -1.5342492974, -24.9112119850),
	(6, 'Pyke', -4.3250630692, -30.0279387411),
	(7, 'Seagard', 2.3042759762, -8.8864615139),
	(8, 'The Eyrie', 2.5254741196, 18.3119050089),
	(9, 'Runestone', -4.6755411207, 34.1322175089),
	(10, 'Bloody Gate', -2.5705012297, 15.8509675089),
	(11, 'The Whispers', -12.7260842969, 34.1894531250),
	(12, 'Dragonstone', -20.6327842504, 30.1464843750),
	(13, 'Harrenhal', -14.0939571778, 5.1855468750),
	(14, 'Riverrun', -10.8333059836, -8.8769531250),
	(16, 'Kings Landing', -29.0732515708, 10.9831140433),
	(17, 'Casterly Rock', -24.0442450630, -29.6223547067),
	(18, 'Faircastle', -17.3063681176, -32.6106359567),
	(19, 'Yronwood', -55.3414738122, 4.2460390690),
	(20, 'Hornwood', 39.7766369090, 12.3893640433),
	(21, 'The Dreadfort', 46.1967239942, 17.6628015433),
	(22, 'Highgarden', -46.9692313878, -18.8184892756),
	(23, 'Oldtown', -53.6987496010, -29.6421005564),
	(24, 'Blackhaven', -48.7051714244, 1.6540746336),
	(25, 'Grassy Vale', -39.5206515931, 1.6540746336),
	(26, 'Ghost Hill', -57.0091552981, 30.2381997145),
	(27, 'Pentos', -28.0732515708, 56.8354866875),
	(28, 'Braavos', 11.3521564640, 55.5156153156);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoed2.route
CREATE TABLE IF NOT EXISTS `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_duration` int(11) NOT NULL,
  `location_one` int(11) NOT NULL,
  `location_two` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__location_one` (`location_one`),
  KEY `FK2_location_two` (`location_two`),
  CONSTRAINT `FK2_location_two` FOREIGN KEY (`location_two`) REFERENCES `location` (`id`),
  CONSTRAINT `FK__location_one` FOREIGN KEY (`location_one`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Volcando datos para la tabla proyectoed2.route: ~36 rows (aproximadamente)
DELETE FROM `route`;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` (`id`, `trip_duration`, `location_one`, `location_two`) VALUES
	(4, 8, 1, 2),
	(5, 2, 2, 20),
	(6, 2, 20, 21),
	(7, 3, 3, 4),
	(8, 8, 2, 4),
	(9, 1, 4, 7),
	(10, 3, 2, 3),
	(11, 1, 7, 5),
	(12, 1, 7, 6),
	(13, 1, 5, 6),
	(14, 4, 7, 14),
	(15, 2, 14, 13),
	(16, 5, 14, 10),
	(17, 2, 10, 8),
	(18, 7, 3, 9),
	(19, 1, 9, 11),
	(20, 2, 11, 12),
	(21, 3, 12, 16),
	(22, 4, 14, 17),
	(23, 2, 17, 18),
	(24, 3, 6, 18),
	(25, 3, 13, 16),
	(26, 6, 17, 16),
	(27, 4, 16, 25),
	(28, 5, 25, 22),
	(29, 8, 17, 22),
	(30, 5, 22, 23),
	(31, 7, 16, 24),
	(32, 4, 24, 19),
	(33, 9, 19, 26),
	(34, 12, 3, 28),
	(35, 6, 12, 28),
	(36, 7, 16, 27),
	(37, 9, 28, 27),
	(38, 2, 8, 9),
	(39, 3, 8, 3),
	(40, 5, 9, 28);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
