import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggler = () => {
  const [isDark, setIsDark] = React.useState(false);

  const handleClick = () => {
    if (isDark) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        isDark
          ? " p-2 rounded bg-primary text-primary-foreground"
          : "p-2 rounded bg-white text-secondary-foreground"
      }`}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggler;
