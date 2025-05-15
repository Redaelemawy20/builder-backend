/*
  Warnings:

  - You are about to alter the column `type` on the `website` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `website` MODIFY `type` ENUM('Website', 'Ecommerce', 'Blog', 'Portfolio', 'News', 'Travel', 'Education', 'Community', 'Application', 'Other') NOT NULL DEFAULT 'Other';
