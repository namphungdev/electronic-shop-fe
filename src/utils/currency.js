const currency = (number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export default currency;
