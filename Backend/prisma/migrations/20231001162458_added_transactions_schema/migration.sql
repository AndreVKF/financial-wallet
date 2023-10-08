-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,
    CONSTRAINT "Transactions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
