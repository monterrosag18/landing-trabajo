CREATE DATABASE IF NOT EXISTS `supcrud_by_crudzaso`;
USE `supcrud_by_crudzaso`;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'USER',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Espacios de Trabajo (Workspaces)
CREATE TABLE IF NOT EXISTS `workspaces` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `owner_id` INT NOT NULL,
  `workspace_key` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'ACTIVE',
  `ai_mode` VARCHAR(20) DEFAULT 'OFF',
  `default_category` VARCHAR(50) DEFAULT 'General',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de Tickets (Completa con las columnas migradas en la Fase 2)
CREATE TABLE IF NOT EXISTS `ticket_references` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_code` VARCHAR(50) NOT NULL UNIQUE,
  `workspace_id` INT NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) DEFAULT 'Sin Asunto',
  `description` TEXT,
  `type` VARCHAR(10) DEFAULT 'P',
  `status` VARCHAR(20) DEFAULT 'OPEN',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON DELETE CASCADE
);
