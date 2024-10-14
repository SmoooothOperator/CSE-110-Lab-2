import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { ThemeContext, heart_themes } from "./heartThemes";
import { Note } from "./folder/types";

interface Props {
  note: Note;
  isFavorite: (id: number) => void;
}

// Wrapper component to provide context
export function ToggleHeart(prop: Props) {
  const [currentTheme, setCurrentTheme] = useState(heart_themes.default);
  const n = prop.note;
  const id = n.id;
  const toggleTheme = () => {
    const newTheme =
      currentTheme === heart_themes.default
        ? heart_themes.red
        : heart_themes.default;
    setCurrentTheme(newTheme);

    prop.isFavorite(id);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button
        onClick={toggleTheme}
        className="heart"
        style={{ color: currentTheme.color }}
      >
        {currentTheme === heart_themes.default ? "♡" : "♥"}
      </button>
    </ThemeContext.Provider>
  );
}
