/*
  Warnings:

  - A unique constraint covering the columns `[entityId,slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Page_name_key` ON `page`;

-- DropIndex
DROP INDEX `Page_slug_key` ON `page`;

-- CreateIndex
CREATE UNIQUE INDEX `Page_entityId_slug_key` ON `Page`(`entityId`, `slug`);
