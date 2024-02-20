-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 04, 2024 at 03:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `city_weather`
--

-- --------------------------------------------------------

--
-- Table structure for table `Adelaide`
--

CREATE TABLE `Adelaide` (
  `id` int(6) UNSIGNED NOT NULL,
  `Day_of_Week` varchar(15) DEFAULT NULL,
  `Day_and_Date` varchar(20) DEFAULT NULL,
  `Weather_Condition` varchar(50) DEFAULT NULL,
  `Weather_Icon` varchar(100) DEFAULT NULL,
  `Temperature` int(5) DEFAULT NULL,
  `Pressure` int(6) DEFAULT NULL,
  `Wind_Speed` decimal(5,2) DEFAULT NULL,
  `Humidity` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Adelaide`
--

INSERT INTO `Adelaide` (`id`, `Day_of_Week`, `Day_and_Date`, `Weather_Condition`, `Weather_Icon`, `Temperature`, `Pressure`, `Wind_Speed`, `Humidity`) VALUES
(1, 'Fri', 'Feb 2, 2024', 'clear sky', '01n', 19, 1012, 1.79, 66),
(2, 'Sat', 'Feb 3, 2024', 'clear sky', '01n', 26, 1006, 3.09, 50),
(3, 'Sun', 'Jan 28, 2024', 'Rainy', '10n', 22, 1010, 7.83, 57),
(4, 'Mon', 'Jan 29, 2024', 'Rainy', '10n', 16, 1005, 8.32, 56),
(5, 'Tue', 'Jan 30, 2024', 'Clear sky', '01d', 18, 1002, 9.00, 50),
(6, 'Wed', 'Jan 31, 2024', 'Rainy', '10n', 17, 998, 9.52, 57),
(7, 'Thu', 'Feb 1, 2024', 'few clouds', '02n', 16, 1017, 3.09, 76);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Adelaide`
--
ALTER TABLE `Adelaide`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Adelaide`
--
ALTER TABLE `Adelaide`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
