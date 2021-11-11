-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_budgetCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingCategory" DROP CONSTRAINT "BudgetSavingCategory_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingItem" DROP CONSTRAINT "BudgetSavingItem_budgetSavingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingItem" DROP CONSTRAINT "BudgetSavingItem_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userMonthCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SavingCategory" DROP CONSTRAINT "SavingCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavingTransaction" DROP CONSTRAINT "SavingTransaction_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonth" DROP CONSTRAINT "UserMonth_monthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonth" DROP CONSTRAINT "UserMonth_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthCategory" DROP CONSTRAINT "UserMonthCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthCategory" DROP CONSTRAINT "UserMonthCategory_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingCategory" DROP CONSTRAINT "UserMonthSavingCategory_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingItem" DROP CONSTRAINT "UserMonthSavingItem_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingItem" DROP CONSTRAINT "UserMonthSavingItem_userMonthSavingCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "UserMonth" ADD CONSTRAINT "UserMonth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonth" ADD CONSTRAINT "UserMonth_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userMonthId_fkey" FOREIGN KEY ("userMonthId") REFERENCES "UserMonth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthCategory" ADD CONSTRAINT "UserMonthCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthCategory" ADD CONSTRAINT "UserMonthCategory_userMonthId_fkey" FOREIGN KEY ("userMonthId") REFERENCES "UserMonth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userMonthCategoryId_fkey" FOREIGN KEY ("userMonthCategoryId") REFERENCES "UserMonthCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthSavingCategory" ADD CONSTRAINT "UserMonthSavingCategory_userMonthId_fkey" FOREIGN KEY ("userMonthId") REFERENCES "UserMonth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthSavingItem" ADD CONSTRAINT "UserMonthSavingItem_userMonthSavingCategoryId_fkey" FOREIGN KEY ("userMonthSavingCategoryId") REFERENCES "UserMonthSavingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthSavingItem" ADD CONSTRAINT "UserMonthSavingItem_savingCategoryId_fkey" FOREIGN KEY ("savingCategoryId") REFERENCES "SavingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingCategory" ADD CONSTRAINT "SavingCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingTransaction" ADD CONSTRAINT "SavingTransaction_savingCategoryId_fkey" FOREIGN KEY ("savingCategoryId") REFERENCES "SavingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetSavingCategory" ADD CONSTRAINT "BudgetSavingCategory_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetSavingItem" ADD CONSTRAINT "BudgetSavingItem_budgetSavingCategoryId_fkey" FOREIGN KEY ("budgetSavingCategoryId") REFERENCES "BudgetSavingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetSavingItem" ADD CONSTRAINT "BudgetSavingItem_savingCategoryId_fkey" FOREIGN KEY ("savingCategoryId") REFERENCES "SavingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "BudgetSavingCategory_budgetId_unique" RENAME TO "BudgetSavingCategory_budgetId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "UserMonthSavingCategory_userMonthId_unique" RENAME TO "UserMonthSavingCategory_userMonthId_key";
