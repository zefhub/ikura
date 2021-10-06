export const classNames = (...classes: any[]): string => {
  return classes.filter(Boolean).join(" ");
};
