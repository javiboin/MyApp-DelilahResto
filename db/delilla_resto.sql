-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2021 a las 23:03:50
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilla_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` int(8) NOT NULL,
  `name` varchar(25) NOT NULL,
  `number` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`id`, `name`, `number`) VALUES
(1, 'San Martin', 124),
(2, 'Rivadavia', 1100),
(3, 'Obligado', 440),
(4, 'falsa', 123),
(6, 'Apollo Creed', 1000),
(7, 'Pink Floyd', 1400),
(8, 'Elm Steet', 8800),
(9, 'Roldan', 800),
(10, 'Eddie Vedder', 1400),
(11, 'Quantum Fracture', 220),
(13, 'Quantum Fracture', 400),
(14, 'Calle False', 123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(12) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `hour` time NOT NULL DEFAULT current_timestamp(),
  `total` float(6,2) NOT NULL,
  `id_user` int(8) NOT NULL,
  `id_address` int(8) NOT NULL,
  `id_order_state` int(1) NOT NULL,
  `id_payment_method` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `date`, `hour`, `total`, `id_user`, `id_address`, `id_order_state`, `id_payment_method`) VALUES
(2, '2021-10-10', '17:45:15', 4000.00, 1, 1, 3, 1),
(4, '2021-10-11', '00:50:33', 150.00, 1, 1, 2, 1),
(5, '2021-10-26', '00:21:12', 150.00, 1, 1, 1, 1),
(6, '2021-10-26', '00:23:01', 150.00, 1, 1, 2, 1),
(7, '2021-10-26', '00:26:45', 150.00, 1, 1, 1, 1),
(8, '2021-10-27', '00:31:55', 150.00, 1, 1, 1, 1),
(9, '2021-10-27', '01:09:50', 150.00, 1, 1, 1, 1),
(10, '2021-10-27', '23:36:48', 150.00, 1, 3, 2, 1),
(11, '2021-10-28', '00:04:24', 150.00, 1, 3, 2, 1),
(20, '2021-10-28', '00:18:20', 150.00, 1, 1, 1, 1),
(21, '2021-10-28', '00:29:23', 150.00, 1, 1, 1, 1),
(23, '2021-10-28', '00:31:37', 150.00, 1, 1, 1, 1),
(25, '2021-10-28', '00:48:31', 0.00, 1, 1, 1, 1),
(31, '2021-10-28', '01:05:48', 150.00, 1, 1, 1, 1),
(32, '2021-10-28', '01:07:06', 150.00, 1, 1, 1, 1),
(33, '2021-10-28', '01:08:32', 150.00, 1, 1, 1, 1),
(35, '2021-10-28', '01:15:43', 2260.00, 1, 1, 1, 1),
(38, '2021-11-21', '19:39:21', 2260.00, 1, 1, 1, 1),
(39, '2021-11-21', '19:46:19', 0.00, 1, 1, 1, 1),
(40, '2021-11-21', '19:47:32', 0.00, 1, 1, 1, 1),
(41, '2021-11-21', '20:23:53', 0.00, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_detail`
--

CREATE TABLE `orders_detail` (
  `id` int(12) NOT NULL,
  `id_order` int(12) NOT NULL,
  `id_product` int(3) NOT NULL,
  `amount` int(2) NOT NULL,
  `price` float(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders_detail`
--

INSERT INTO `orders_detail` (`id`, `id_order`, `id_product`, `amount`, `price`) VALUES
(17, 20, 1, 1, 1.00),
(18, 21, 1, 1, 1.00),
(20, 23, 1, 1, 1.00),
(21, 23, 1, 1, 1.00),
(23, 25, 1, 4, 600.00),
(24, 25, 2, 4, 500.00),
(25, 25, 3, 4, 30.00),
(39, 31, 1, 2, 600.00),
(40, 31, 2, 2, 500.00),
(41, 31, 3, 2, 30.00),
(42, 32, 1, 2, 600.00),
(43, 32, 2, 2, 500.00),
(44, 32, 3, 2, 30.00),
(45, 33, 1, 2, 600.00),
(46, 33, 2, 2, 500.00),
(47, 33, 3, 2, 30.00),
(51, 35, 1, 2, 600.00),
(52, 35, 2, 2, 500.00),
(53, 35, 3, 2, 30.00),
(54, 38, 1, 2, 600.00),
(55, 38, 2, 2, 500.00),
(56, 38, 3, 2, 30.00),
(57, 39, 1, 2, 0.00),
(58, 39, 2, 2, 500.00),
(59, 39, 3, 2, 30.00),
(60, 40, 1, 2, 0.00),
(61, 41, 1, 2, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_states`
--

CREATE TABLE `order_states` (
  `id` int(1) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_states`
--

INSERT INTO `order_states` (`id`, `name`) VALUES
(1, 'Nuevo'),
(2, 'Confirmado'),
(3, 'Preparando'),
(4, 'Enviando'),
(5, 'Cancelado'),
(6, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(2) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'efectivo'),
(2, 'Credito'),
(5, 'debito'),
(6, 'Para Borrar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  `price` float(6,2) NOT NULL,
  `pic` varchar(100) NOT NULL,
  `id_product_state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `pic`, `id_product_state`) VALUES
(1, 'Combo 2 Hamburguesas', 1500.00, 'https://i.imgur.com/g7Iz9JC.jpeg', 2),
(2, 'Papas Bravas', 500.00, 'https://i.imgur.com/lRVc3f3.jpeg', 1),
(3, 'Papas con Cheddar y ', 600.00, 'https://i.imgur.com/5BKqHkv.jpeg', 1),
(5, 'Hamburguesa completa', 750.00, 'https://i.imgur.com/0p1Njec.jpeg', 1),
(6, 'Hamburguesa Vegana', 600.00, 'https://i.imgur.com/QnI5jFM.jpeg', 1),
(13, 'Bondiolin', 100.00, 'https://i.imgur.com/oFVYR34.jpeg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_states`
--

CREATE TABLE `product_states` (
  `id` int(1) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_states`
--

INSERT INTO `product_states` (`id`, `name`) VALUES
(1, 'En el Menu'),
(2, 'Fuera del Menu'),
(5, 'Para Borrar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` int(12) NOT NULL,
  `password` varchar(60) NOT NULL,
  `id_user_state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nickname`, `name`, `email`, `phone`, `password`, `id_user_state`) VALUES
(1, 'daveG', 'Dave Grohl', 'Grohl@aol.com', 542964223, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 1),
(2, 'taylorM', 'Taylor Hawkins1', 'Taylor@Catfich.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 2),
(3, 'patS', 'Pat Smear', 'Pat@patmail.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 3),
(6, 'caosf', 'Cosme Fulanito', 'nuevo@gmail.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 1),
(7, 'ramiJ', 'Rami Jaffee', 'ramithebest2020@gmail.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 3),
(8, 'caosf', 'Cosme Fulanito', 'nuevo@gmail.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 1),
(14, 'patS', 'Cosme Fulanito', 'nuevo@gmail.com', 1234567, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 1),
(16, 'JaviDev', 'Javier Oyarzo', 'javijavijavi@gmail.com', 2147483647, '$2a$08$d3dMOaVtYiCLMNQlr7fG8euZOX432GkHjpsa6ZWuqF3bekOY.heEW', 2),
(17, 'usuario12', 'Calle False', 'fulanito123@gmail.com', 2147483647, '$2a$08$zBtSAIBL6GFir21SGbVRQuWYE9nyWFDA2MREMgEmDGqGcz8nCZqCi', 2),
(18, 'usuario1xxx', 'Calle False', 'fulanitoxxxx@gmail.com', 2147483647, '$2a$08$MnTDjpHxlKiZRAkOS7WedOl8FXosywFj.mFSfncReSCiVBhs08iJC', 2),
(24, 'usuario1744', 'Calle False', 'fulanito123vww@gmail.com', 2147483647, '$2a$08$ubquDoBUolEG8d4KCadHPeHdjJj6xUgEaByEMHFzusJWSJw6Leg9O', 2),
(25, 'usuario174pupi', 'Calle False', 'fgers123vww@gmail.com', 2147483647, '$2a$08$6NAyYCcB5s7DGr1F.lT2/Ob4J5NVjzC7OHzPxNoriJuvGumfUiGAO', 2),
(26, 'usuario10000', 'fulanito000', 'fulanito1230000@gmail.com', 2147483647, '$2a$08$nw5JudHuBsS6ViAXI.IlSOwJzPPc6Wb.Dwq0McdkqdpGSI5EDdqva', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_address`
--

CREATE TABLE `users_address` (
  `id` int(8) NOT NULL,
  `id_user` int(8) NOT NULL,
  `id_address` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_address`
--

INSERT INTO `users_address` (`id`, `id_user`, `id_address`) VALUES
(1, 1, 1),
(13, 1, 2),
(4, 18, 14),
(10, 24, 14),
(11, 25, 14),
(12, 26, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_states`
--

CREATE TABLE `user_states` (
  `id` int(1) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_states`
--

INSERT INTO `user_states` (`id`, `name`) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Suspendido'),
(5, 'Por  Suspender');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_suspensions`
--

CREATE TABLE `user_suspensions` (
  `id` int(8) NOT NULL,
  `reason` varchar(70) NOT NULL,
  `id_user` int(8) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_suspensions`
--

INSERT INTO `user_suspensions` (`id`, `reason`, `id_user`, `datetime`) VALUES
(1, 'Trato mal al repartidor', 6, '2021-10-05 20:03:46'),
(3, 'Mala Actitud 89', 3, '2021-10-06 20:05:45'),
(4, 'Mala Actitud 2', 1, '2021-10-10 23:06:46'),
(5, 'Mala Actitud 3', 1, '2021-10-10 23:07:32'),
(6, 'Mala Actitud 66', 1, '2021-10-20 02:54:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`,`id_address`,`id_order_state`,`id_payment_method`),
  ADD KEY `id_payment_method` (`id_payment_method`),
  ADD KEY `id_order_state` (`id_order_state`),
  ADD KEY `id_address` (`id_address`);

--
-- Indices de la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order` (`id_order`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `order_states`
--
ALTER TABLE `order_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product_state` (`id_product_state`);

--
-- Indices de la tabla `product_states`
--
ALTER TABLE `product_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user_state` (`id_user_state`);

--
-- Indices de la tabla `users_address`
--
ALTER TABLE `users_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`,`id_address`),
  ADD KEY `id_address` (`id_address`);

--
-- Indices de la tabla `user_states`
--
ALTER TABLE `user_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_suspensions`
--
ALTER TABLE `user_suspensions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `order_states`
--
ALTER TABLE `order_states`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `product_states`
--
ALTER TABLE `product_states`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `users_address`
--
ALTER TABLE `users_address`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user_states`
--
ALTER TABLE `user_states`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user_suspensions`
--
ALTER TABLE `user_suspensions`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_payment_method`) REFERENCES `payment_methods` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_order_state`) REFERENCES `order_states` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_address`) REFERENCES `addresses` (`id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD CONSTRAINT `orders_detail_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_detail_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_product_state`) REFERENCES `product_states` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_user_state`) REFERENCES `user_states` (`id`);

--
-- Filtros para la tabla `users_address`
--
ALTER TABLE `users_address`
  ADD CONSTRAINT `users_address_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_address_ibfk_2` FOREIGN KEY (`id_address`) REFERENCES `addresses` (`id`);

--
-- Filtros para la tabla `user_suspensions`
--
ALTER TABLE `user_suspensions`
  ADD CONSTRAINT `user_suspensions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
