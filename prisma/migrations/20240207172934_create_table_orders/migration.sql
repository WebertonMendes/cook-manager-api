-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "table" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "totalPrice" DECIMAL(10,2),
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
