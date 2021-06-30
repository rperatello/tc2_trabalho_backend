CREATE DATABASE tc2_backend
USE tc2_backend

CREATE TABLE `usuario` (
  `id` int AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `login` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,  
  `admin` boolean DEFAULT false,
  CONSTRAINT usuario_pk primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `contato` (
  `id` int AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(80) DEFAULT NULL,
  `telefone` varchar(80) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,  
  `user_id` int NOT NULL,
  CONSTRAINT contato_pk primary key (id),
  CONSTRAINT `contato_iduser_fk` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `compromisso` (
  `id` int AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `obs` text DEFAULT NULL,
  `participantes` text DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,  
  `status` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  CONSTRAINT compromisso_pk primary key (id),
  CONSTRAINT `compromisso_iduser_fk` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;