import { COLUMN_COLOR } from "@/config/constants";

export const generateColumnBorderColor = (color: keyof typeof COLUMN_COLOR) => {
  switch (color) {
    case COLUMN_COLOR.GRAY:
      return "#848D97";
    case COLUMN_COLOR.BLUE:
      return "#2F81F7";
    case COLUMN_COLOR.GREEN:
      return "#3FB950";
    case COLUMN_COLOR.YELLOW:
      return "#D29922";
    case COLUMN_COLOR.ORANGE:
      return "#D29922";
    case COLUMN_COLOR.RED:
      return "#D29922";
    case COLUMN_COLOR.PINK:
      return "#DB61A2";
    case COLUMN_COLOR.PURPLE:
      return "#DB61A2";
  }
};
