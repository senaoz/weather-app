import SearchBox from "./Components/SearchBox";
import List from "./Components/List";
import { LocProvider } from "./Context/LocationProvider";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState } from "react";

function App() {
  const [isDarkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && isDarkMode)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.theme = checked ? "dark" : "light";
  };

  return (
    <LocProvider>
      <div className="flex items-center">
        <div className="flex-1 mr-4">
          <SearchBox />
        </div>
        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} />
      </div>
      <List />
    </LocProvider>
  );
}

export default App;
