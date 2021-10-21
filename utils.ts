export const classNames = (...classes: any[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const fieldHasError = (props: any): boolean => {
  // if (props.touched && props.touched[props.name] === true) {
  if (props.errors && props.errors[props.name]) {
    return true;
  }
  // }
  return false;
};

export const getTitleLang = (locale?: string, category?: any): string => {
  switch (locale) {
    case "en":
      return category.titleLangEn;
    case "ja":
      return category.titleLangJa;
    default:
      return category.titleLangEn;
  }
};
