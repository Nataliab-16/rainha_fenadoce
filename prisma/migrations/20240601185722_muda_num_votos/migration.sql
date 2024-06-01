/*
  Warnings:

  - You are about to drop the column `numVotos` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidatas" ADD COLUMN     "numVotos" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "numVotos";
