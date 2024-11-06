/*
  Warnings:

  - You are about to drop the column `service_note_id` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `payment_id` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `ServiceNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_service_note_id_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "service_note_id";

-- AlterTable
ALTER TABLE "Scheduling" ADD COLUMN     "payment_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ServiceNote" ADD COLUMN     "payment_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SessionCapacity" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "session" "Session" NOT NULL,
    "max_patients" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SessionCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionCapacity_schedule_id_session_key" ON "SessionCapacity"("schedule_id", "session");

-- AddForeignKey
ALTER TABLE "SessionCapacity" ADD CONSTRAINT "SessionCapacity_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "StaffSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceNote" ADD CONSTRAINT "ServiceNote_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
