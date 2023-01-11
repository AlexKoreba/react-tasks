import RainbowFrame from "./components/RainbowFrame";


function App() {

  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

  return (
    <div className="App">

        <RainbowFrame colors={colors}>
            React!
        </RainbowFrame>

    </div>
  );
}

export default App;