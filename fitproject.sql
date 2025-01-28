-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 28. 13:31
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fitproject`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_bmi`
--

CREATE TABLE `fitproject_bmi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `bmi_value` decimal(5,2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_calories`
--

CREATE TABLE `fitproject_calories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `calorie_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_categories`
--

CREATE TABLE `fitproject_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `fitproject_categories`
--

INSERT INTO `fitproject_categories` (`id`, `name`, `description`) VALUES
(1, 'Vegetables', 'Fresh vegetables rich in nutrients.'),
(2, 'Fruits', 'Winter and summer fruits rich in vitamins.'),
(3, 'Meats and fishes', 'Animal-based foods rich in protein.'),
(4, 'Pasta', 'Types of pasta that serve as a source of carbohydrates.'),
(5, 'Nuts and Legumes', 'Plant-based ingredients rich in protein.'),
(6, 'Dairy', 'Milk-based products, rich in calcium and protein.'),
(7, 'Others', 'Other ingredients that do not fall into the main categories.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_ingredients`
--

CREATE TABLE `fitproject_ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cal_per_100g` decimal(5,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `fitproject_ingredients`
--

INSERT INTO `fitproject_ingredients` (`id`, `name`, `cal_per_100g`, `category_id`, `description`) VALUES
(1, 'Spinach', '23.00', 1, NULL),
(2, 'Cucumber', '15.00', 1, NULL),
(3, 'Tomato', '18.00', 1, NULL),
(4, 'Bell Pepper', '20.00', 1, NULL),
(5, 'Zucchini', '17.00', 1, NULL),
(6, 'Cauliflower', '25.00', 1, NULL),
(7, 'Onion', '40.00', 1, NULL),
(8, 'Garlic', '149.00', 1, NULL),
(9, 'Sweet Potato', '86.00', 1, NULL),
(10, 'Avocado', '160.00', 2, NULL),
(11, 'Lemon', '29.00', 2, NULL),
(12, 'Chicken Breast', '165.00', 3, NULL),
(13, 'Salmon', '416.00', 3, NULL),
(14, 'Tuna', '132.00', 3, NULL),
(15, 'Spaghetti', '158.00', 4, NULL),
(16, 'Black Beans', '339.00', 5, NULL),
(17, 'Chickpeas', '164.00', 5, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_recipes`
--

CREATE TABLE `fitproject_recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `fitproject_recipes`
--

INSERT INTO `fitproject_recipes` (`id`, `name`, `description`) VALUES
(1, 'Grilled Chicken Salad', 'Grilled chicken breast served on a bed of spinach, cucumber, and tomato with olive oil dressing.'),
(2, 'Sweet Potato and Black Bean Bowl', 'A hearty bowl with roasted sweet potato, black beans, onion, garlic, and avocado.'),
(3, 'Salmon with Roasted Vegetables', 'Grilled salmon served with roasted bell peppers, zucchini, and cauliflower.'),
(4, 'Chickpea and Spinach Stir-Fry', 'A stir-fry made with chickpeas, spinach, onion, garlic, and lemon juice.'),
(5, 'Spaghetti with Tomato and Garlic Sauce', 'A classic spaghetti with fresh tomato and garlic sauce.'),
(6, 'Avocado and Tuna Salad', 'A light salad made with tuna, avocado, cucumber, and olive oil dressing.'),
(7, 'Quinoa and Roasted Vegetable Bowl', 'Quinoa served with roasted bell peppers, zucchini, and sweet potato.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_recipe_ingredients`
--

CREATE TABLE `fitproject_recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `amount` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `fitproject_recipe_ingredients`
--

INSERT INTO `fitproject_recipe_ingredients` (`recipe_id`, `ingredient_id`, `amount`) VALUES
(1, 1, '150.00'),
(1, 2, '50.00'),
(1, 3, '50.00'),
(1, 4, '50.00'),
(1, 5, '10.00'),
(1, 16, '10.00'),
(2, 5, '10.00'),
(2, 6, '200.00'),
(2, 7, '100.00'),
(2, 8, '50.00'),
(2, 9, '10.00'),
(2, 16, '10.00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_users`
--

CREATE TABLE `fitproject_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `salt` varchar(64) NOT NULL,
  `aktiv` int(1) NOT NULL,
  `jogosultsag` int(1) NOT NULL,
  `email` varchar(100) NOT NULL,
  `regisztracio_datum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `fitproject_bmi`
--
ALTER TABLE `fitproject_bmi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `fitproject_calories`
--
ALTER TABLE `fitproject_calories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `fitproject_categories`
--
ALTER TABLE `fitproject_categories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `fitproject_ingredients`
--
ALTER TABLE `fitproject_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `fitproject_recipes`
--
ALTER TABLE `fitproject_recipes`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `fitproject_recipe_ingredients`
--
ALTER TABLE `fitproject_recipe_ingredients`
  ADD PRIMARY KEY (`recipe_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- A tábla indexei `fitproject_users`
--
ALTER TABLE `fitproject_users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `fitproject_bmi`
--
ALTER TABLE `fitproject_bmi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `fitproject_calories`
--
ALTER TABLE `fitproject_calories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `fitproject_categories`
--
ALTER TABLE `fitproject_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `fitproject_ingredients`
--
ALTER TABLE `fitproject_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `fitproject_recipes`
--
ALTER TABLE `fitproject_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `fitproject_users`
--
ALTER TABLE `fitproject_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fitproject_bmi`
--
ALTER TABLE `fitproject_bmi`
  ADD CONSTRAINT `fitproject_bmi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitproject_users` (`id`);

--
-- Megkötések a táblához `fitproject_calories`
--
ALTER TABLE `fitproject_calories`
  ADD CONSTRAINT `fitproject_calories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitproject_users` (`id`);

--
-- Megkötések a táblához `fitproject_ingredients`
--
ALTER TABLE `fitproject_ingredients`
  ADD CONSTRAINT `fitproject_ingredients_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `fitproject_categories` (`id`);

--
-- Megkötések a táblához `fitproject_recipe_ingredients`
--
ALTER TABLE `fitproject_recipe_ingredients`
  ADD CONSTRAINT `fitproject_recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `fitproject_recipes` (`id`),
  ADD CONSTRAINT `fitproject_recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `fitproject_ingredients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
