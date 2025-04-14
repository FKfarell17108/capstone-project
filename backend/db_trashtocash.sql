-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2025 at 02:54 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_trashtocash`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `goal` int NOT NULL,
  `reward_coins` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `description`, `goal`, `reward_coins`, `start_date`, `end_date`, `created_at`) VALUES
(1, 'Kumpulkan sampah sebanyak 1kg dalam 3 hari dan dapatkan 100 point', 'Lorem ipsum amet', 3, 100, '2025-03-01', '2025-03-03', '2025-03-21 23:46:11'),
(3, 'Kumpulkan 2kg sampah dalam 5 hari', 'Challenge kebersihan', 5, 200, '1500-09-09', '1500-10-10', '2025-03-22 01:01:30'),
(6, 'Kumpulin sampah plastik sebanyak 1 kg.', 'Lorem ipsum almet', 1, 100, '2025-10-01', '2025-10-05', '2025-03-24 09:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `educational_content`
--

CREATE TABLE `educational_content` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `content_type` enum('article','video','quiz') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `educational_content`
--

INSERT INTO `educational_content` (`id`, `title`, `content`, `content_type`, `created_at`) VALUES
(1, 'Belajar memilah sampah', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'article', '2025-03-20 23:36:48'),
(2, 'Sampah plastik bisa jadi uang', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'article', '2025-03-20 23:37:34'),
(4, 'Cegah penumpukan sampah dengan reduce sampah', 'Lorem ipsum almet', 'article', '2025-03-20 23:59:32'),
(6, 'Kerajinan dari sampah karya P5 kurikulum merdeka', 'Updated content for this article.', 'video', '2024-03-19 17:00:00'),
(10, 'Belajar Daur Ulang sampah', 'Informasi tentang daur ulang sampah', 'video', '2025-03-22 17:12:40'),
(11, 'Cegah penumpukan sampah dengan reduce sampah', 'Lorem ipsum almet', 'article', '2025-03-24 07:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `status`, `created_at`) VALUES
(9, 7, 'Notifikasi baru!', 'read', '2025-03-25 01:30:57');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `seller_id` int DEFAULT NULL,
  `collector_id` int NOT NULL,
  `trash_id` int DEFAULT NULL,
  `payment_method` enum('coins','cash') NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `total_coins` int NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `seller_id`, `collector_id`, `trash_id`, `payment_method`, `total_price`, `total_coins`, `status`, `created_at`, `updated_at`) VALUES
(5, 2, 0, 10, 'cash', '50000.00', 100, 'completed', '2025-03-22 16:51:57', '2025-03-22 16:54:04'),
(8, 5, 4, 11, 'cash', '10000.00', 100, 'completed', '2025-03-24 08:34:57', '2025-03-24 08:49:56');

-- --------------------------------------------------------

--
-- Table structure for table `trash`
--

CREATE TABLE `trash` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `category` enum('organic','non-organic') NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('available','sold','pending') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trash`
--

INSERT INTO `trash` (`id`, `user_id`, `name`, `image`, `category`, `weight`, `location`, `status`, `created_at`, `updated_at`) VALUES
(10, 2, 'Galon bekas', 'galon.jpg', 'non-organic', '2.00', 'Cirebon', 'pending', '2025-03-22 07:07:06', '2025-03-22 07:07:06'),
(11, 5, 'Botol bekas', 'botol.jpg', 'non-organic', '2.00', 'Bogor', 'pending', '2025-03-24 07:42:34', '2025-03-24 07:42:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(258) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('user','collector','admin') DEFAULT 'user',
  `coins` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `role`, `coins`, `created_at`, `updated_at`) VALUES
(2, 'hanifah', '$2b$10$A/SFUlXv07abFwmo5qs47u8wd15LmpZ7Z5aFqzsIzr2UoxfQObypC', 'hanifah@example.com', '08123456789', 'user', 100, '2025-03-22 02:09:26', '2025-03-22 16:54:04'),
(3, 'admin', '$2b$10$kkMWJoqDngjjktUJ3aE6SupMh.Yg3l1PHA/doK2qcX./6FEryipzq', 'admin@example.com', '08123456789', 'admin', 0, '2025-03-22 02:11:51', '2025-03-22 02:11:51'),
(4, 'Saya kolektor', '$2b$10$/3LmiTpz1qW9let8ozUaE.ctbiWblxxctctsdRBgRKZF2Pfu4O9C2', 'kolektor@example.com', '08123456777', 'collector', 0, '2025-03-22 04:42:06', '2025-03-22 04:42:06'),
(5, 'siti nur', '$2b$10$JO9Ni2ffwnIlqBS89Uny.eAsjSTtRdjSCtPcltpe3nme0QFpB63Sa', 'sitinur@example.com', '08123456789', 'user', 100, '2025-03-24 06:43:21', '2025-03-24 08:49:56'),
(6, 'Omar', '$2b$10$oIfaVjIelRueYGV7dN5WVewZgI.yNCf9TeGvHoLYJ0ovAFlrLdY/.', 'omar@example.com', '08123456777', 'user', 800, '2025-03-24 23:43:56', '2025-03-25 00:55:26'),
(7, 'Yuka', '$2b$10$NVVCqAh5G7.xOkvzd/FJQOsrh.rF3z83z9wvxR0x74zBWIWXb6dm2', 'yuka@example.com', '08123456666', 'user', 0, '2025-03-24 23:44:36', '2025-03-24 23:44:36'),
(10, 'Silmia', '$2b$10$d19VFU.q9u.Zr0bj/AewLunuSwkzfsEgvQ56HF9o3BL.jDUYHHoii', 'silmia@example.com', '088823456789', 'user', 100, '2025-03-25 02:19:04', '2025-03-25 02:25:24');

-- --------------------------------------------------------

--
-- Table structure for table `user_challenges`
--

CREATE TABLE `user_challenges` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `challenge_id` int DEFAULT NULL,
  `progress` int DEFAULT '0',
  `status` enum('in_progress','completed') DEFAULT 'in_progress',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_challenges`
--

INSERT INTO `user_challenges` (`id`, `user_id`, `challenge_id`, `progress`, `status`, `created_at`) VALUES
(9, 6, 6, 100, 'completed', '2025-03-25 00:53:59'),
(10, 10, 6, 100, 'completed', '2025-03-25 02:24:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educational_content`
--
ALTER TABLE `educational_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `seller_id` (`seller_id`),
  ADD KEY `trash_id` (`trash_id`);

--
-- Indexes for table `trash`
--
ALTER TABLE `trash`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_challenges`
--
ALTER TABLE `user_challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `challenge_id` (`challenge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `educational_content`
--
ALTER TABLE `educational_content`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `trash`
--
ALTER TABLE `trash`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_challenges`
--
ALTER TABLE `user_challenges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`trash_id`) REFERENCES `trash` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `trash`
--
ALTER TABLE `trash`
  ADD CONSTRAINT `trash_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_challenges`
--
ALTER TABLE `user_challenges`
  ADD CONSTRAINT `user_challenges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_challenges_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
