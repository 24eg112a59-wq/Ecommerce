export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
};

export const getDiscountedPrice = (price, discount = 0) => {
  return Number((Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2));
};
