export const formatStarsCount = (num: number) => {
  const format = (divisor: number, suffix: string) => {
    const formattedNum = (num / divisor).toFixed(1);
    return formattedNum.endsWith(".0")
      ? formattedNum.slice(0, -2) + suffix
      : formattedNum + suffix;
  };

  if (num >= 1000000) {
    return format(1000000, "m");
  } else if (num >= 1000) {
    return format(1000, "k");
  } else {
    return num.toString();
  }
};
