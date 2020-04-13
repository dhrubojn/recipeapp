-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2020 at 03:31 AM
-- Server version: 8.0.18
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipes`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `recipe_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ingredients` text COLLATE utf8mb4_general_ci,
  `instructions` text COLLATE utf8mb4_general_ci,
  `serving_size` int(11) DEFAULT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_general_ci,
  `date_added` timestamp NULL DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `recipe_name`, `ingredients`, `instructions`, `serving_size`, `category`, `notes`, `date_added`, `date_modified`) VALUES
(1, 'Chili&con&carne', 'beans, tomato, beef, broth', 'Lorem ipsum', 3, 'Chiili', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Pad&Thai&Chicken', 'chicken, garlic, ginger, chilli', 'Lorem ipsum', 2, 'Thai', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Pineapple&chicken', 'pinapple, chicken', 'Lorem ipsum', 4, 'Thai', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Salmon&in&the&oven', 'salmon, chilli powder', 'Lorem ipsum', 2, 'Thai', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Basic&pasta', 'pasta, basil, tomato', 'Lorem ipsum', 2, 'Thai', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Carbonara&al&funghi', 'pasta, white sauce', 'Lorem ipsum', 3, 'Mexican', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Simple&spaghetti&bolognaise', 'spagehtti, tomato, beef', 'Lorem ipsum', 4, 'Mexican', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Cucumber&salad', 'cucumber, salad', 'Lorem ipsum', 5, 'Mexican', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Goat&cheese&and&Beetroot', 'goat cheese, beetroot', 'Lorem ipsum', 1, 'Continental', 'Sample Notes', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
