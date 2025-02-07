-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 07. 12:09
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
CREATE DATABASE IF NOT EXISTS `fitproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fitproject`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_calories`
--

CREATE TABLE `fitproject_calories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `calorie_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_categories`
--

CREATE TABLE `fitproject_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fitproject_categories`
--

INSERT INTO `fitproject_categories` (`id`, `name`, `description`) VALUES
(1, 'Vegetables', 'Fresh vegetables rich in nutrients.'),
(2, 'Fruits', 'Winter and summer fruits rich in vitamins.'),
(3, 'Meats and fishes', 'Animal-based foods rich in protein.'),
(4, 'Pasta and Breads', 'Pasta and bread varieties in different shapes and types.'),
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
  `description` text DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fitproject_ingredients`
--

INSERT INTO `fitproject_ingredients` (`id`, `name`, `cal_per_100g`, `category_id`, `description`, `imageUrl`) VALUES
(1, 'Spinach', 23.00, 1, 'Leafy green vegetable, rich in iron and vitamins.', 'https://th.bing.com/th/id/R.69c8e4a215d4101bd5aeabee6c0761a1?rik=hpE1JJGR9x7f1w&pid=ImgRaw&r=0'),
(2, 'Cucumber', 15.00, 1, 'Refreshing and hydrating vegetable with low calories.', 'https://th.bing.com/th/id/R.b4a43737db6aa8942fabb25a889f0ef5?rik=ZfkXpMA68U9uVw&pid=ImgRaw&r=0'),
(3, 'Tomato', 18.00, 1, 'Juicy and versatile fruit rich in antioxidants.', 'https://th.bing.com/th/id/R.bbeb30029c56d0cc00bd24a57c45eccf?rik=BTQvRZoBGcH1FA&riu=http%3a%2f%2fimages.food52.com%2fdrm8Tk_5nVd7XhzV-XJ4KHg1k2c%3d%2ffruits.jpg&ehk=XEw8KnPqf7uR6AA8qZZ%2bXI9%2fwVftMNdp66eYN%2f%2bMwE%3d&risl=&pid=ImgRaw&r=0'),
(4, 'Bell Pepper', 20.00, 1, 'Colorful and crunchy vegetable, high in vitamin C.', 'https://i5.walmartimages.com/seo/Fresh-Red-Bell-Pepper-1-Each_7be94a8e-9a5d-4f87-842f-5fe4084138ba.c95d36e140f5e0d492ca632b42e4543c.jpeg'),
(5, 'Zucchini', 17.00, 1, 'Mild-flavored squash, low in calories and carbs.', 'https://th.bing.com/th/id/OIP.L-GsCgpLFQeviCv4xq5KcAHaE7?rs=1&pid=ImgDetMain'),
(6, 'Cauliflower', 25.00, 1, 'Cruciferous vegetable, rich in fiber and vitamins.', 'https://th.bing.com/th/id/R.a9bb5f4e2784a4e038cbae92634cef10?rik=WkEZnPmHt7FiNQ&riu=http%3a%2f%2fnutrawiki.org%2fwp-content%2fuploads%2f2015%2f09%2fCauliflower.jpg&ehk=McP9NlaloU%2bdei9SFVtIx%2fNOFu1Xsc1nnFpasDVm4xI%3d&risl=&pid=ImgRaw&r=0'),
(7, 'Onion', 40.00, 1, 'Aromatic vegetable, commonly used for flavoring dishes.', 'https://th.bing.com/th/id/R.052be22181d0c17bf8429e621342260a?rik=SG8%2bBrDy1HvI3A&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f2%2f25%2fOnion_on_White.JPG&ehk=gfDnDMsK438K8p%2fRFIjYr2d0UmlNECHvc%2bVweodGVuc%3d&risl=1&pid=ImgRaw&r=0'),
(8, 'Garlic', 149.00, 1, 'Pungent bulb, known for its health benefits.', 'https://th.bing.com/th/id/R.750ee80645d877fc8b79a1d5d663744b?rik=8uXbmwxw1Hiu4A&pid=ImgRaw&r=0'),
(9, 'Sweet Potato', 86.00, 1, 'Sweet and starchy root vegetable, rich in fiber.', 'https://th.bing.com/th/id/R.2d6d312d0724b1ee697dd476502715b9?rik=fPRaQBGTHYZnuQ&riu=http%3a%2f%2fbtrade-egypt.com%2fwp-content%2fuploads%2f2018%2f04%2f413886.jpg&ehk=oiTMZPHI%2fT1i9ZxYTbZ5HAgLYFeIHAqTH5RFzIBbArs%3d&risl=&pid=ImgRaw&r=0'),
(10, 'Avocado', 160.00, 2, 'Creamy and nutritious fruit, high in healthy fats.', 'https://th.bing.com/th/id/R.bbeb30029c56d0cc00bd24a57c45eccf?rik=BTQvRZoQcMf5eQ&pid=ImgRaw&r=0'),
(11, 'Lemon', 29.00, 2, 'Citrus fruit, rich in vitamin C and antioxidants.', 'https://th.bing.com/th/id/R.b6ed0902ffc864d338685cbe9a81d6b4?rik=XResj%2f9s6erUOQ&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2017%2f01%2fLemon-Pictures.jpg&ehk=uqmoQmEjzkmOXfbukSeOQdXpFOSM4cHciqbgL%2fw2TfY%3d&risl=&pid=ImgRaw&r=0'),
(12, 'Chicken Breast', 165.00, 3, 'Lean source of protein, great for muscle growth.', 'https://th.bing.com/th/id/OIP.Q-btDC5WGxraku_zhxpLBAHaHa?w=750&h=750&rs=1&pid=ImgDetMain'),
(13, 'Salmon', 416.00, 3, 'Fatty fish, rich in omega-3 fatty acids and protein.', 'https://img.freepik.com/premium-photo/shadowless-salmon-fillet-white-background_1030432-4663.jpg'),
(14, 'Tuna', 132.00, 3, 'Lean fish, high in protein and low in fat.', 'https://www.gastrolabweb.com/u/fotografias/m/2020/7/21/f1280x720-1890_133565_5050.jpg'),
(15, 'Vermicelli', 140.00, 4, 'Thin, long pasta used in soups and one-pot dishes.', 'https://www.thespruceeats.com/thmb/ZWVfAXj6eN1DFFSSeo7No-ir6mc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vermicelliIgorDutina-72b370f6227f4ac88465ac2fcff56462.jpg'),
(16, 'Black Beans', 339.00, 5, 'Protein-packed legume, rich in fiber and iron.', 'https://th.bing.com/th/id/OIP.csA3yUFZxpPaD9vq_K61nwHaE8?rs=1&pid=ImgDetMain'),
(17, 'Chickpeas', 164.00, 5, 'Nutty-flavored legume, high in plant-based protein.', 'https://img.freepik.com/premium-photo/bunch-chickpeas-white-isolated-background-top-view_270100-2670.jpg?w=2000'),
(18, 'Carrot', 41.00, 1, 'A crunchy and sweet vegetable rich in beta-carotene and fiber.', 'https://www.spencers.in/media/catalog/product/1/0/1000808_2.jpg'),
(19, 'Broccoli', 55.00, 1, 'A nutrient-dense vegetable high in vitamins C and K.', 'https://th.bing.com/th/id/R.5341184da71ddce835721e48ad4f528a?rik=STn8glO4uSvarA&riu=http%3a%2f%2fwww.rivieraproduce.eu%2fwp-content%2fuploads%2f2011%2f08%2fimage_riviera_broccoli.jpg&ehk=OO9GhzV02R8pftBLm%2f%2be4CUh04Jh42iw3FSx%2fyspa3M%3d&risl=&pid=ImgRa'),
(20, 'Lettuce', 15.00, 1, 'A leafy green often used in salads, low in calories and rich in water.', 'https://th.bing.com/th/id/OIP.tuPYOMyMcXV-Ae86WBn0FAHaFn?rs=1&pid=ImgDetMain'),
(21, 'Cabbage', 25.00, 1, 'A versatile vegetable, great for salads, stir-fries, and fermented dishes.', 'https://www.freshpoint.com/wp-content/uploads/2020/02/Freshpoint-green-cabbage.jpg'),
(22, 'Mushroom', 22.00, 1, 'A low-calorie fungi packed with antioxidants and umami flavor.', 'https://horecapont.hu/wp-content/uploads/2024/03/Shimenji-feher.webp'),
(23, 'Radish', 16.00, 1, 'A spicy and crunchy root vegetable, rich in vitamin C.', 'https://media.healthyfood.com/wp-content/uploads/2016/09/In-season-Aug-Radishes-Thinkstock_154289238.jpg'),
(24, 'Beetroot', 43.00, 1, 'A sweet and earthy root vegetable known for its high antioxidant content.', 'https://wallpapercave.com/wp/wp7291548.jpg'),
(25, 'Eggplant', 25.00, 1, 'A soft and spongy vegetable often used in Mediterranean and Asian dishes.', 'https://th.bing.com/th/id/R.1092a60282a53ad062b14bd2b4a6bb74?rik=bB%2b4yA2%2fuFipfQ&riu=http%3a%2f%2fmysahana.org%2fwp-content%2fuploads%2f2010%2f09%2feggplant.jpg&ehk=tcOsLCgIvWIwWcpxO7N4Cz3bqQazF2GYGMC%2f3zLm75w%3d&risl=&pid=ImgRaw&r=0'),
(26, 'Asparagus', 20.00, 1, 'A fiber-rich vegetable with a delicate flavor, low in calories.', 'https://vegetablegrowersnews.com/wp-content/uploads/2019/04/ASPARAGUS.jpeg'),
(27, 'Celery', 16.00, 1, 'A crunchy vegetable with high water content and low calories.', 'https://www.gardeningknowhow.com/wp-content/uploads/2021/06/fresh-celery.jpg'),
(28, 'Pumpkin', 26.00, 1, 'A vibrant orange vegetable rich in beta-carotene and antioxidants.', 'https://milpa.cl/wp-content/uploads/2022/08/bottom-view-buternut-squash-cut-in-half-on-ground-scaled-e1660436842152.jpg'),
(29, 'Peas', 81.00, 1, 'A protein-rich vegetable that provides fiber and vitamins.', 'https://cdn.shopify.com/s/files/1/1380/2059/products/Peas.jpg?v=1480318425'),
(30, 'Brussels Sprouts', 43.00, 1, 'A cruciferous vegetable high in vitamin C and fiber.', 'https://th.bing.com/th/id/R.caf9ed3286cbafc6c055da306c9e4121?rik=bHR3Gv30MYBAZg&riu=http%3a%2f%2ffillyourplate.org%2fblog%2fwp-content%2fuploads%2f2014%2f03%2fbigstock-Brussels-Sprouts-2735340.jpg&ehk=w8u49pHtSyAeFtl5vhHhfEqLAWXnLQOsPR1dKeyGvUM%3d&risl=&p'),
(31, 'Apple', 52.00, 2, 'A sweet, crisp fruit commonly eaten raw.', 'https://th.bing.com/th/id/R.8f5ff2e8c8efcf2e4e4730b39b91951d?rik=lI9W7xRnC8SDYg&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f1%2f15%2fRed_Apple.jpg&ehk=yc0sOMMcFxEbzUr6B6KnEj%2bAyx0nLaVXHkJ9iN73cUw%3d&risl=&pid=ImgRaw&r=0'),
(32, 'Banana', 89.00, 2, 'A sweet, yellow fruit known for its high potassium content.', 'https://images.interactives.dk/istock-636739634--4N4IjClMWTmK70JK4OXdg.jpg?auto=compress&ch=Width%2CDPR'),
(33, 'Orange', 47.00, 2, 'A citrus fruit rich in vitamin C.', 'https://media.istockphoto.com/photos/fresh-orange-picture-id494939036?b=1&k=20&m=494939036&s=170667a&w=0&h=Xa21eXM1uG6qS-eQE8bi0xNFH1adFbZimM6KnDTil8Q='),
(34, 'Strawberry', 32.00, 2, 'A small, red fruit with a sweet flavor.', 'https://th.bing.com/th/id/R.bcd3e42e921f3a6244304594620d9fff?rik=4ZPWFCXYcYMUCQ&riu=http%3a%2f%2fdrannwellness.com%2fwp-content%2fuploads%2f2014%2f03%2fstrawberries1.jpg&ehk=oP6odbIlRBwue%2f4WxchZHTNMcJnW2BG%2f934AkWcbQSA%3d&risl=1&pid=ImgRaw&r=0'),
(35, 'Pineapple', 50.00, 2, 'A tropical fruit with a tangy sweetness.', 'https://th.bing.com/th/id/R.38c93f5f147cd00f38a488b7cd7a50ad?rik=%2bSa%2bOIG8GnzYKQ&riu=http%3a%2f%2fweknowyourdreams.com%2fimages%2fpineapple%2fpineapple-08.jpg&ehk=KV9%2fnGjs5ZfzkUUPF1FA6rtEWUtocGJ0iN2UhsO8fXg%3d&risl=&pid=ImgRaw&r=0'),
(36, 'Blueberry', 57.00, 2, 'A small, blue fruit rich in antioxidants.', 'https://th.bing.com/th/id/R.8ee5a9cf3a8584106f2e521bc306b643?rik=RQZfQ4tr8pSWeA&pid=ImgRaw&r=0'),
(37, 'Peach', 39.00, 2, 'A juicy fruit with a sweet and slightly tart flavor.', 'https://th.bing.com/th/id/R.91d5e08f62a38279eb3933a71edfd28d?rik=Ea0p9BhOAWrRYQ&pid=ImgRaw&r=0'),
(38, 'Watermelon', 30.00, 2, 'A large, watery fruit perfect for hot summer days.', 'https://th.bing.com/th/id/R.6c794fa4c8947184c9f808074b574066?rik=tVbGqx%2fEN1vvcA&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f09%2fWatermelon-HD-Desktop.jpg&ehk=YHHziGKdsT5u7DGmnBv7u72baTDtnLGRs505hPpF9Vw%3d&risl=1&pid=ImgRaw&r=0'),
(39, 'Grapes', 69.00, 2, 'Small, sweet, and juicy fruits that grow in clusters.', 'https://th.bing.com/th/id/R.883c48d6cd794c22f7c58a38c891dfd3?rik=oDAiZQxZiAxl4Q&pid=ImgRaw&r=0'),
(40, 'Mango', 60.00, 2, 'A tropical fruit known for its sweet, juicy flesh.', 'https://th.bing.com/th/id/R.56d48000affd8f4464a54081c77e0325?rik=QpGGoJ8N67fCdA&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2017%2f01%2fMango-HD-Wallpaper.jpg&ehk=oLj0XKQ46%2f9PP7Llvi2Nq0ptyu6dO%2bwOMWzrGvWU5pU%3d&risl=&pid=ImgRaw&r=0'),
(41, 'Kiwi', 61.00, 2, 'A small, fuzzy fruit with a tangy, sweet flavor.', NULL),
(42, 'Plum', 46.00, 2, 'A small, round fruit with a smooth skin and sweet flesh.', NULL),
(43, 'Papaya', 43.00, 2, 'A tropical fruit with soft, sweet orange flesh.', NULL),
(44, 'Cherry', 50.00, 2, 'A small, round fruit that can be sweet or tart.', NULL),
(45, 'Pear', 57.00, 2, 'A juicy fruit with a smooth texture and sweet taste.', NULL),
(46, 'Fig', 74.00, 2, 'A sweet fruit with a soft texture and small edible seeds.', NULL),
(47, 'Apricot', 48.00, 2, 'A small, orange fruit with a tart yet sweet flavor.', NULL),
(48, 'Raspberry', 52.00, 2, 'A small, red fruit known for its tart and sweet taste.', NULL),
(49, 'Beef', 250.00, 3, 'A rich source of protein and iron, commonly used in various dishes.', NULL),
(50, 'Pork', 242.00, 3, 'A versatile meat that can be used in many forms, such as chops or sausages.', NULL),
(51, 'Lamb', 294.00, 3, 'A tender meat often used in stews, roasts, and barbecues.', NULL),
(52, 'Turkey', 135.00, 3, 'A lean meat, often associated with festive meals.', NULL),
(53, 'Duck', 337.00, 3, 'A flavorful, fatty meat that is often roasted or pan-seared.', NULL),
(54, 'Cod', 105.00, 3, 'A mild-tasting white fish, often used in fish and chips.', NULL),
(55, 'Veal', 172.00, 3, 'A tender and mild-tasting meat, often used in high-end dishes like veal cutlets.', NULL),
(56, 'Tuna', 132.00, 3, 'A lean fish, often used in salads or sushi.', 'https://www.gastrolabweb.com/u/fotografias/m/2020/7/21/f1280x720-1890_133565_5050.jpg'),
(57, 'Trout', 148.00, 3, 'A freshwater fish with a delicate, mild flavor.', NULL),
(58, 'Shrimp', 99.00, 3, 'Small, shellfish with a sweet flavor, often used in seafood dishes.', NULL),
(59, 'Spaghetti', 158.00, 4, 'A long, thin pasta that is commonly served with tomato or meat sauce.', NULL),
(60, 'Penne', 131.00, 4, 'Short, tube-shaped pasta that pairs well with a variety of sauces.', NULL),
(61, 'Fusilli', 132.00, 4, 'Spiral-shaped pasta that holds sauces well and is great for baked dishes.', NULL),
(62, 'Fettuccine', 148.00, 4, 'Flat, ribbon-like pasta often used in creamy sauces like Alfredo.', NULL),
(63, 'Linguine', 134.00, 4, 'A flat, narrow pasta often paired with seafood or pesto.', NULL),
(64, 'Rigatoni', 155.00, 4, 'Large, ridged pasta that is perfect for thick, hearty sauces.', NULL),
(65, 'Macaroni', 158.00, 4, 'Small, elbow-shaped pasta often used in macaroni and cheese.', NULL),
(66, 'Lasagna', 140.00, 4, 'Wide, flat sheets of pasta used in layered baked dishes.', NULL),
(67, 'Ravioli', 160.00, 4, 'Small pasta pillows filled with various ingredients like cheese or meat.', NULL),
(68, 'Tortellini', 156.00, 4, 'Small, ring-shaped pasta typically filled with cheese or meat.', NULL),
(69, 'Almonds', 576.00, 5, 'A nutrient-rich nut, often used in baking or as a snack.', NULL),
(70, 'Walnuts', 654.00, 5, 'Rich in omega-3 fatty acids, walnuts are often used in salads, desserts, or eaten on their own.', NULL),
(71, 'Peanuts', 567.00, 5, 'A legume that is commonly used in snacks, but also in cooking and peanut butter.', NULL),
(72, 'Lentils', 116.00, 5, 'Small, round legumes used in soups, salads, and vegetarian dishes.', NULL),
(73, 'Pistachios', 562.00, 5, 'A nut that is often used in desserts or as a snack, with a distinctive green color.', NULL),
(74, 'Cashews', 553.00, 5, 'A creamy nut commonly used in Asian dishes, snacks, or nut butters.', NULL),
(75, 'Hazelnuts', 628.00, 5, 'A sweet, nutrient-rich nut commonly used in desserts or as a snack.', NULL),
(76, 'Soybeans', 446.00, 5, 'A legume high in protein, often used in vegetarian dishes or made into soy products.', NULL),
(77, 'Sunflower Seeds', 584.00, 5, 'Nutrient-rich seeds commonly used as a snack or in salads.', NULL),
(78, 'Pumpkin Seeds', 559.00, 5, 'Rich in magnesium, these seeds are great for snacking or adding to salads.', NULL),
(79, 'Chia Seeds', 486.00, 5, 'Tiny, nutrient-dense seeds, often added to smoothies or used in pudding recipes.', NULL),
(80, 'Flaxseeds', 534.00, 5, 'High in omega-3 fatty acids, commonly used in smoothies or added to baked goods.', NULL),
(81, 'Sesame Seeds', 573.00, 5, 'Small seeds rich in calcium, often sprinkled on baked goods or used in tahini.', NULL),
(82, 'Milk', 42.00, 6, 'A basic dairy product rich in calcium and protein, commonly consumed as a drink or in various dishes.', NULL),
(83, 'Cheese', 350.00, 6, 'Available in various types, a dairy product rich in calcium and protein, used as an ingredient or eaten on its own.', NULL),
(84, 'Yogurt', 59.00, 6, 'A dairy-based fermented product rich in probiotics, aiding digestion.', NULL),
(85, 'Sour Cream', 210.00, 6, 'A condensed dairy product often used in soups, stews, or salads.', NULL),
(86, 'Cottage Cheese', 98.00, 6, 'Fresh, low-fat dairy product often used in dishes like cottage cheese pasta, pies, or salads.', NULL),
(87, 'Light Sour Cream', 140.00, 6, 'A lighter version of sour cream, commonly added to soups, sauces, and salads.', NULL),
(88, 'Kefir', 41.00, 6, 'Fermented dairy drink rich in probiotics, supporting digestion and a healthy gut flora.', NULL),
(89, 'Lactose-free Milk', 42.00, 6, 'Lactose-free milk ideal for individuals with lactose intolerance.', NULL),
(90, 'Mozzarella', 280.00, 6, 'Soft, fresh cheese often used in salads, pizzas, or sandwiches.', NULL),
(91, 'Gorgonzola', 358.00, 6, 'A blue cheese with a strong flavor, often used in sauces or salads.', NULL),
(92, 'Almond Milk', 13.00, 6, 'A non-dairy milk alternative made from almonds, low in calories and often used as a substitute for regular milk in drinks and recipes.', NULL),
(93, 'Coconut Milk', 230.00, 6, 'A creamy liquid derived from the flesh of coconuts, used in cooking, smoothies, and desserts.', NULL),
(94, 'Soy Milk', 33.00, 6, 'A plant-based milk alternative made from soybeans, often used in coffee, smoothies, or baking.', NULL),
(95, 'Oat Milk', 46.00, 6, 'A dairy-free milk alternative made from oats, typically used in coffee, smoothies, and baking.', NULL),
(96, 'Rice Milk', 47.00, 6, 'A light, sweet non-dairy milk made from rice, suitable for those with allergies to nuts or soy.', NULL),
(97, 'Cashew Milk', 25.00, 6, 'A creamy, non-dairy milk alternative made from cashews, often used in coffee and smoothies.', NULL),
(98, 'Hemp Milk', 50.00, 6, 'A plant-based milk made from hemp seeds, a good source of omega-3 fatty acids and protein.', NULL),
(99, 'Butter', 717.00, 6, 'A dairy product made by churning cream, commonly used in cooking, baking, and as a spread.', NULL),
(100, 'Ketchup', 112.00, 7, 'A sweet and tangy tomato-based condiment commonly used with fast food, burgers, and fries.', NULL),
(101, 'Mayonnaise', 680.00, 7, 'A creamy condiment made from eggs, oil, and vinegar, commonly used in sandwiches, salads, and as a dip. The nutritional value may vary depending on the brand and preparation method.', NULL),
(102, 'Olive Oil', 884.00, 7, 'A plant-based oil commonly used in cooking, dressings, and for drizzling on salads or roasted vegetables.', NULL),
(103, 'Coconut Oil', 862.00, 7, 'A plant-based oil that is solid at room temperature, commonly used for baking, frying, and sautéing.', NULL),
(104, 'Honey', 304.00, 7, 'A natural sweetener made by bees from flower nectar, often used in teas, baked goods, or as a spread.', NULL),
(105, 'Salt', 0.00, 7, 'A mineral commonly used to season food and preserve it.', NULL),
(106, 'Black Pepper', 255.00, 7, 'A common spice used to season food, offering a mild heat and a strong flavor.', NULL),
(107, 'Vinegar', 22.00, 7, 'A sour liquid made from fermented ethanol, used in cooking and salad dressings.', NULL),
(108, 'Soy Sauce', 53.00, 7, 'A fermented liquid made from soybeans, used as a seasoning in East Asian cuisine.', NULL),
(109, 'Mustard', 66.00, 7, 'A condiment made from mustard seeds, commonly used in sandwiches, salads, and with meats.', NULL),
(110, 'Peanut Butter', 588.00, 7, 'A creamy, nutty spread made from peanuts, often used in sandwiches, cookies, or smoothies.', NULL),
(111, 'White Bread', 265.00, 4, 'A soft, fluffy bread made from refined wheat flour.', NULL),
(112, 'Whole Wheat Bread', 247.00, 4, 'A bread made with whole wheat flour, known for its nutty flavor and dense texture.', NULL),
(113, 'Sourdough Bread', 290.00, 4, 'A tangy, crusty bread made through a fermentation process.', NULL),
(114, 'Rye Bread', 259.00, 4, 'A denser, darker bread made with rye flour, often with a sour taste.', NULL),
(115, 'Ciabatta', 275.00, 4, 'An Italian white bread with a crispy crust and soft, airy interior.', NULL),
(116, 'Baguette', 280.00, 4, 'A long, narrow loaf of French bread with a crispy crust and soft inside.', NULL),
(117, 'Focaccia', 290.00, 4, 'An Italian flatbread, often seasoned with herbs and olive oil.', NULL),
(118, 'Toast Bread', 265.00, 4, 'A soft bread specifically made for toasting, often sliced thinly.', NULL),
(119, 'Multigrain Bread', 240.00, 4, 'Bread made from a variety of grains like oats, barley, and seeds, offering a denser texture and more nutrients.', NULL),
(120, 'Bagel', 250.00, 4, 'A round, dense bread with a chewy texture, typically boiled before baking.', NULL),
(121, 'Pita Bread', 275.00, 4, 'A round, flatbread that puffs up during baking, creating a pocket perfect for stuffing.', NULL),
(122, 'Brioche', 350.00, 4, 'A sweet, buttery bread that is often used for dessert or rich sandwiches.', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fitproject_recipes`
--

CREATE TABLE `fitproject_recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fitproject_recipe_ingredients`
--

INSERT INTO `fitproject_recipe_ingredients` (`recipe_id`, `ingredient_id`, `amount`) VALUES
(1, 1, 150.00),
(1, 2, 50.00),
(1, 3, 50.00),
(1, 4, 50.00),
(1, 5, 10.00),
(1, 16, 10.00),
(2, 5, 10.00),
(2, 6, 200.00),
(2, 7, 100.00),
(2, 8, 50.00),
(2, 9, 10.00),
(2, 16, 10.00);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fitproject_users`
--

INSERT INTO `fitproject_users` (`id`, `name`, `hash`, `gender`, `salt`, `aktiv`, `jogosultsag`, `email`, `regisztracio_datum`) VALUES
(3, 'valyiroland', '90746cb3330455f3b05da32e3150f2c2c8caf78849131879865da68ab5bcdd6c', 'male', '2352b4d508b82fdfc8966726fc8efaa3', 1, 0, 'valyir@kkszki.hu', '2025-02-07 08:21:27');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT a táblához `fitproject_recipes`
--
ALTER TABLE `fitproject_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `fitproject_users`
--
ALTER TABLE `fitproject_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
