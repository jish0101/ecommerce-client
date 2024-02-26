export const formatNumber = (num = 0, format) => {
  try {
    if (format) {
      return Number(num).toLocaleString(format);
    }
    return Number(num).toLocaleString();
  } catch (error) {
    console.error(error);
    return 'num';
  }
};
