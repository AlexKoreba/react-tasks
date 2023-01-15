import DoubleButton from "./components/DoubleButton";
import { withColorFrames } from "./hof/withColorFrames";

const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
const FramedDoubleButton = withColorFrames(colors)(DoubleButton);

function App() {

  return (

    <div className="App">

        <FramedDoubleButton caption1 = "first" caption2 = "second" cbPressed={ selectedBtn => console.log(`Option selected - ${selectedBtn}`) }>
            Choose an answer&hellip;
        </FramedDoubleButton>

    </div>

  );
}

export default App;