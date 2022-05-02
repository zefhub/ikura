export const parseCurrency = (value: number): number => {
  if (isNaN(value)) {
    return 0;
  }

  // Check if the value is a int
  if (Number.isInteger(value)) {
    return value * 100;
  }

  const fixed = parseFloat(value.toFixed(2));
  return Math.round(fixed * 100);
};
