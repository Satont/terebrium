/*
  Warnings:

  - Added the required column `accessToken` to the `twitch_channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `twitch_channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "twitch_channels" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;
