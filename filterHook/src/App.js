import Filter from "./components/Filter";
import list from "./helpers/list.json";
import "./styles/main.css";


function App() {
  return (
    <div className="App">
        <Filter arrList={list} />
    </div>
  );
}

export default App;