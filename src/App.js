import SearchBox from "./Components/SearchBox";
import List from "./Components/List";
import { LocProvider } from "./Context/LocationProvider";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState } from "react";

function App() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <LocProvider>
      <div className="flex items-center">
        <div className="flex-1 mr-4">
          <SearchBox />
        </div>

        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} />
      </div>
      <List></List>
    </LocProvider>
  );
}

export default App;
