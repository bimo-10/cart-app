export const getTotals = (cart) => {
  console.log(cart);

  let totalAmount = 0;
  let totalCost = 0;

  for (const { amount, price } of cart.values()) {
    console.log(amount, price);

    totalAmount += amount;
    totalCost += amount * price;
  }

  return { totalAmount, totalCost };
};
