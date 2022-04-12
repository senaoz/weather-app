import SearchBox from "./Components/SearchBox";
import List from "./Components/List";
import { LocProvider } from "./Context/LocationProvider";

function App() {
  return (
    <LocProvider>
      <SearchBox />
      <List></List>
    </LocProvider>
  );
}

export default App;
