/*
  Warnings:

  - You are about to drop the column `type` on the `layout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `layout` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `section` ADD COLUMN `type` ENUM('nav', 'footer', 'news', 'section', 'persons') NOT NULL DEFAULT 'section';
