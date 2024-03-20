import { COLUMN_COLOR } from "@/config/constants";

export const generateColumnBackgroundColor = (
  color: keyof typeof COLUMN_COLOR,
) => {
  switch (color) {
    case COLUMN_COLOR.GRAY:
      return "#161B22";
    case COLUMN_COLOR.BLUE:
      return "#1A2639";
    case COLUMN_COLOR.GREEN:
      return "#1A2F27";
    case COLUMN_COLOR.YELLOW:
      return "#2F2A1E";
    case COLUMN_COLOR.ORANGE:
      return "#2A2323";
    case COLUMN_COLOR.RED:
      return "#2D2026";
    case COLUMN_COLOR.PINK:
      return "#2A2230";
    case COLUMN_COLOR.PURPLE:
      return "#252438";
  }
};
