// ThemeContext.ts
import React from "react";

export const heart_themes = {
  default: {
    color: "#000000",
  },
  red: {
    color: "#ff0000",
  },
};

export const ThemeContext = React.createContext(heart_themes.default);
