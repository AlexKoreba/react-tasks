import BR2JSX from "./components/BR2JSX";


function App() {

  let text = "первый<br>второй<br/>третий<br />последний";

  return (
    <div className="App">

      <BR2JSX text={text} />

    </div>
  );
}

export default App;