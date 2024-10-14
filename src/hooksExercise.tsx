import React, { useContext, useState, useEffect } from "react";
import { ThemeContext, themes } from "./themeContext";

export function ClickCounter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>You clicked {count} times </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.foreground, color: theme.background }}
      >
        Click me
      </button>
    </div>
  );
}

interface Props {
  toggleTheme: () => void;
}
// Wrapper component to provide context
export function ToggleTheme(props: Props) {
  return <button onClick={props.toggleTheme}> Toggle Theme </button>;
}
