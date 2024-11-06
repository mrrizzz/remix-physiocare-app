/*
  Warnings:

  - The values [OWNER] on the enum `StaffType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterEnum
BEGIN;
CREATE TYPE "StaffType_new" AS ENUM ('ADMIN', 'DOCTOR', 'OFFICER');
ALTER TABLE "Staff" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Staff" ALTER COLUMN "type" TYPE "StaffType_new" USING ("type"::text::"StaffType_new");
ALTER TYPE "StaffType" RENAME TO "StaffType_old";
ALTER TYPE "StaffType_new" RENAME TO "StaffType";
DROP TYPE "StaffType_old";
ALTER TABLE "Staff" ALTER COLUMN "type" SET DEFAULT 'DOCTOR';
COMMIT;

-- CreateTable
CREATE TABLE "StaffSchedule" (
    "id" SERIAL NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "day" "Day" NOT NULL,
    "sessions" "Session"[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "StaffSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffSchedule_staff_id_day_key" ON "StaffSchedule"("staff_id", "day");

-- AddForeignKey
ALTER TABLE "StaffSchedule" ADD CONSTRAINT "StaffSchedule_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
