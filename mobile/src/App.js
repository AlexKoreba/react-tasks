import Company from "./components/Company";

import clients from './helpers/clientsList.json';
import "./styles/main.css";


function App() {
  return (
    <div className="App">

      <Company clients = {clients} />

    </div>
  );
}

export default App;