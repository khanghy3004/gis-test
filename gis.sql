-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2020 at 12:19 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gis`
--

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `dirt` int(11) NOT NULL,
  `noise` int(11) NOT NULL,
  `water` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `latitude` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `dirt`, `noise`, `water`, `time`, `longitude`, `latitude`) VALUES
(1, 50, 50, 100, '2019-12-30 00:00:00', '105.715260', '10.1008'),
(1, 10, 10, 10, '2020-01-03 00:00:00', '105.715260', '10.1008'),
(1, 30, 50, 50, '2020-01-03 03:00:00', '105.71526', '10.1008\r\n'),
(1, 100, 10, 40, '2020-01-03 05:00:00', '105.71526', '10.1008'),
(1, 24, 45, 1, '2020-01-03 07:00:00', '105.71526', '10.1008'),
(1, 100, 100, 40, '2020-01-03 09:00:00', '105.71526', '10.1008'),
(1, 200, 45, 1, '2020-01-03 11:00:00', '105.71526', '10.1008'),
(1, 69, 69, 69, '2020-01-03 13:00:00', '105.71526', '10.1008'),
(1, 169, 169, 169, '2020-01-03 15:00:00', '105.71526', '10.1008'),
(2, 100, 100, 100, '2020-01-02 00:00:00', '105.8', '10.1008'),
(2, 20, 30, 40, '2020-01-03 00:00:00', '105.8', '10.1008\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `vip` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `vip`) VALUES
(1, 'hy', 'hy@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 0),
(2, 'hy', 'khanghy3004@gmail.com', '202cb962ac59075b964b07152d234b70', 1),
(3, 'hy', 'khanghy@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1),
(4, 'admin', 'admin@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`,`time`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
