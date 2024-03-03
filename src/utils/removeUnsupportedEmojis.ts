export const removeUnsupportedEmojis = (str: string) => {
  const regex = /:\w+:/g;
  const newStr = str.replace(regex, "");

  return newStr;
};
