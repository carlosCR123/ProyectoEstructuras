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

-- Volcando estructura para tabla proyectoed2.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `latitude` decimal(12,10) NOT NULL,
  `longitude` decimal(13,10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- La exportación de datos fue deseleccionada.
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
