-- CreateEnum
CREATE TYPE "public"."DocumentStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'READY', 'FAILED');

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "status" "public"."DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Document_uploadedBy_idx" ON "public"."Document"("uploadedBy");

-- CreateIndex
CREATE INDEX "Document_status_idx" ON "public"."Document"("status");

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
