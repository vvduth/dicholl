SELECT to_char("createdAt","MM/YY") as "month",
sum("totalPrice") as "totalSales"
FROM "Order" 
GROUP BY to_char("createdAt","MM/YY")