import "./styles/main.css";

import Filter from "./components/Filter";
import { list } from "./helpers/list";


function App() {
  return (
    <div className="App">
        <Filter arr={list} />
    </div>
  );
}

export default App;