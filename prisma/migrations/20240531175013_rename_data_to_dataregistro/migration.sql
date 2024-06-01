/*
  Warnings:

  - You are about to drop the column `data` on the `votos` table. All the data in the column will be lost.
  - Added the required column `dataregistro` to the `votos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "votos" DROP COLUMN "data",
ADD COLUMN     "dataregistro" TIMESTAMP(3) NOT NULL;
