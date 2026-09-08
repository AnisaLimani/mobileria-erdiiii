-- Drop existing database and recreate
DROP DATABASE IF EXISTS mobileria_db;
CREATE DATABASE mobileria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mobileria_db;

-- Create Products Table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data
INSERT INTO products (name, description, image, category) VALUES
('Kuzhinë Klasike', 'Mobilje funksionale dhe elegante për gatimin tuaj', 'kuzhina1.jpg', 'Kuzhina'),
('Kuzhinë Moderna Premium', 'Dizajn modern me materiale cilësore', 'kuzhina2.jpg', 'Kuzhina'),
('Kuzhinë Minimaliste', 'Linja të pastra dhe funksionale', 'kuzhina3.jpg', 'Kuzhina'),
('Kuzhinë Moderne me Ishull', 'Ishull qendror për më shumë hapësirë', 'kuzhina4.jpg', 'Kuzhina'),
('Tavolinë Darku Walnut', 'Tavolinë elegante për darka familjare', 'tavolina1.jpg', 'Tavolina'),
('Tavolinë Kafeje Modern', 'Dizajn minimalist për ambientet moderne', 'tavolina2.jpg', 'Tavolina'),
('Tavolinë Pune Ergonomike', 'Ergonomike për punë komode', 'tavolina3.jpg', 'Tavolina'),
('Tavolinë Këndi Round', 'Tavolinë e rrumbullakët për kënde komode', 'tavolina4.jpg', 'Tavolina'),
('Komodë 6 Sirtarëshe', 'Magazinim i gjerë për çdo ambient', 'komoda1.jpg', 'Komoda'),
('Komodë TV Minimaliste', 'Komodë moderne për televizor', 'komoda2.jpg', 'Komoda'),
('Komodë Veshjesh Premium', 'Për dhomë gjumi me stil', 'komoda3.jpg', 'Komoda'),
('Komodë Hyrjeje', 'Për korridor dhe hyrje', 'komoda4.jpg', 'Komoda'),
('Divan 3-Vendësh Premium', 'Komoditet i përkryer për familjen', 'divani1.jpg', 'Divane'),
('Divan Këndi L-Formë', 'Divan këndi për hapësira të mëdha', 'divani2.jpg', 'Divane'),
('Fotelje Relaksi', 'Relaks total në çdo moment', 'divani3.jpg', 'Divane'),
('Divan 2-Vendësh Modern', 'Divan kompakt për ambiente moderne', 'divani4.jpg', 'Divane');
