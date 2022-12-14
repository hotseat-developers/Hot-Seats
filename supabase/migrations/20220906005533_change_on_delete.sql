-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE "Task" DROP CONSTRAINT "Task_itemId_fkey";
ALTER TABLE "Task" ADD CONSTRAINT "Task_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ItemOnOrder" DROP CONSTRAINT "ItemOnOrder_orderId_fkey";
ALTER TABLE "ItemOnOrder" DROP CONSTRAINT "ItemOnOrder_itemId_fkey";
ALTER TABLE "ItemOnOrder" ADD CONSTRAINT "ItemOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ItemOnOrder" ADD CONSTRAINT "ItemOnOrder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
