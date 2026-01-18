-- Create images table for storing company images as BLOB
-- Run this SQL query in your MySQL database

CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_type VARCHAR(50) NOT NULL COMMENT 'Type of image: owner, hero, service, team, etc.',
  image_name VARCHAR(255) NOT NULL COMMENT 'Original filename of the image',
  image_data LONGBLOB NOT NULL COMMENT 'Image file stored as binary data',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_image_type (image_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
