-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ttr
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intento` int DEFAULT NULL,
  `calificacion` decimal(4,2) DEFAULT NULL,
  `id_ejercicio` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_insignia` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
INSERT INTO `calificaciones` VALUES (1,1,0.00,1,2,NULL,'2025-05-24'),(2,2,0.00,1,2,NULL,'2025-05-24'),(3,3,0.00,1,2,NULL,'2025-05-24'),(4,4,0.00,1,2,NULL,'2025-05-24'),(5,5,10.00,1,2,NULL,'2025-05-24'),(6,1,0.00,2,2,NULL,'2025-05-24'),(7,2,0.00,2,2,NULL,'2025-05-24'),(8,3,0.00,2,2,NULL,'2025-05-24'),(9,4,10.00,2,2,NULL,'2025-05-24'),(10,5,10.00,2,2,NULL,'2025-05-24'),(11,1,8.00,3,2,NULL,'2025-05-26'),(12,2,10.00,3,2,NULL,'2025-05-26'),(13,1,0.00,4,2,NULL,'2025-05-26'),(14,2,10.00,4,2,NULL,'2025-05-26'),(15,3,10.00,4,2,NULL,'2025-05-26'),(16,4,5.00,4,2,NULL,'2025-05-26'),(17,1,9.00,5,2,NULL,'2025-05-26'),(18,2,9.00,5,2,NULL,'2025-05-26'),(19,3,6.00,5,2,NULL,'2025-05-26'),(20,1,10.00,6,2,NULL,'2025-05-26'),(21,2,0.00,6,2,NULL,'2025-05-26');
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificaciones2`
--

DROP TABLE IF EXISTS `calificaciones2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intento` int DEFAULT NULL,
  `calificacion` decimal(4,2) DEFAULT NULL,
  `id_ejercicio` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_insignia` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones2`
--

LOCK TABLES `calificaciones2` WRITE;
/*!40000 ALTER TABLE `calificaciones2` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificaciones2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificaciones3`
--

DROP TABLE IF EXISTS `calificaciones3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones3` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intento` int DEFAULT NULL,
  `calificacion` decimal(4,2) DEFAULT NULL,
  `id_ejercicio` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_insignia` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones3`
--

LOCK TABLES `calificaciones3` WRITE;
/*!40000 ALTER TABLE `calificaciones3` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificaciones3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consejos`
--

DROP TABLE IF EXISTS `consejos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consejos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `id_ejercicio` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consejos`
--

LOCK TABLES `consejos` WRITE;
/*!40000 ALTER TABLE `consejos` DISABLE KEYS */;
/*!40000 ALTER TABLE `consejos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicios`
--

DROP TABLE IF EXISTS `ejercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ejercicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `id_grado` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicios`
--

LOCK TABLES `ejercicios` WRITE;
/*!40000 ALTER TABLE `ejercicios` DISABLE KEYS */;
INSERT INTO `ejercicios` VALUES (1,'La Escalera Mágica Ascendente','Escucha el número y escribe la sucesión de forma ascendente dejando un espacio entre cada número',1),(2,'La Escalera Mágica Descendente','Escucha el número y escribe la sucesión de forma descendente',1),(3,'Vamos al Mercado','Cuenta cuántas frutas hay, agrupa de 5 en 5 y de 10 en 10, y represéntalas con palitos (|).',1),(4,'Caja Misteriosa','Saca los objetos de la caja misteriosa, cuenta cuántos hay y representa con símbolos (|).',1),(5,'El tren de los Números','Completa los números que faltan siguiendo las reglas de conteo de cada serie.',1),(6,'Encontrando Números','En este ejercicio, debes colorear los números que son múltiplos de 2, 5 y 10 en una tabla de números del 1 al 100. Observa y comenta lo que notas sobre los patrones.',1),(7,'La Tiendita','Suma el precio de los productos, luego paga con monedas y, si es necesario, da el cambio.',1),(8,'El Picnic','El picnic de los conejitos, vacas y perros',1),(9,'El Conteo','Arrastra los Objetos segun sea necesario para completar las Sumas',1),(10,'El Detective','Arrastra los elementos y escribe el resultado de la suma',1),(11,'La Fiesta','La fiesta de los ratones, caballos y dragones',1),(12,'El Ladron','Un ladrón robo algunos objetos de ciertos lugares , identifica cuales y cuántos robo',1),(13,'Sumando y restando','Resuelve las siguientes sumas y restas arrastrando el resultado correcto a la casilla',1),(14,'Conociendo los Cuerpos y Figuras Geométricas','Conociendo los cuerpos y figuras geométricas',1),(15,'El juego de las Figuras','Juego de Figuras Geométricas',1),(16,'Clasificando Objetos','Arrastra cada objeto al recuadro correcto según tenga cara plana o cara curva. Tienes hasta 5 intentos en total para lograrlo.',1),(17,'El Memorama','Juego de Memorama',1),(18,'La Botella','Llena las botellas correctamente, arrastrando los litros dentro de cada una hasta lograr la cantidad específica',1),(19,'La Balanza','Comparar peso con una balanza',1),(20,'Comparando objetos','Comparando objetos',1),(21,'El itinerario','El itinerario del usuario',1),(22,'Conociendo el tiempo','Conociendo los meses, días, semanas, horas y minutos',1),(23,'Mi Día a Día','Mi día a día',1),(24,'La Granja','Pictograma: Gallinas y Cisnes',1),(25,'El deporte y la naturaleza','Pictograma: Barcelona y Real Madrid',1),(26,'Los aviones','Gráfica de ventas de aviones',1);
/*!40000 ALTER TABLE `ejercicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grados`
--

DROP TABLE IF EXISTS `grados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grado` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grados`
--

LOCK TABLES `grados` WRITE;
/*!40000 ALTER TABLE `grados` DISABLE KEYS */;
INSERT INTO `grados` VALUES (1,'Primero'),(2,'Segundo'),(3,'Tercero');
/*!40000 ALTER TABLE `grados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insignias`
--

DROP TABLE IF EXISTS `insignias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insignias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `id_ejercicio` int DEFAULT NULL,
  `id_calif` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insignias`
--

LOCK TABLES `insignias` WRITE;
/*!40000 ALTER TABLE `insignias` DISABLE KEYS */;
/*!40000 ALTER TABLE `insignias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `grado_id` int DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Antonio Xolio','axoliorio@gamail.com','BE1CDD1D84CD3F797221B0E9613225EB905A0E5ECD5DE316B545D8F2B1A01462',1,'images/user_fp/perfil1.jpg','axolio'),(5,'Adad ','adad@gamail.com','2850d7c471b3d5893c6d4b7af08bc42c732ac6102d3e9e071683ddf1e4b0cae7',3,'/images/user_fp/user-1744499805794-213591792.jpg','adad'),(6,'Eduardo Salgado','esalgado@gmail.com','f4e3933ae81fd7d2fdc710570ffe7943435bfe168d37737decd46214e814f171',2,'/images/user_fp/user-1744599601533-199815598.jpeg','esalgado');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26  1:35:21
