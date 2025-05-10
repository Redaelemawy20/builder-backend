/*
  Warnings:

  - The primary key for the `pagesections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `PageSections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Remove existing foreign keys
ALTER TABLE PageSections DROP FOREIGN KEY `PageSections_pageId_fkey`;
ALTER TABLE PageSections DROP FOREIGN KEY `PageSections_sectionId_fkey`;

-- Drop existing primary key
ALTER TABLE PageSections DROP PRIMARY KEY;

-- Add new auto-increment primary key
ALTER TABLE PageSections ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

-- Re-add foreign keys
ALTER TABLE PageSections ADD CONSTRAINT `PageSections_pageId_fkey` FOREIGN KEY (pageId) REFERENCES Page(id);
ALTER TABLE PageSections ADD CONSTRAINT `PageSections_sectionId_fkey` FOREIGN KEY (sectionId) REFERENCES Section(id);

