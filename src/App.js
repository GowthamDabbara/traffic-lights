import TrafficLight from "./Components/TrafficLight";
import TrafficManager from "./Components/TrafficManager";

function App() {
	return (
		<div>
			<TrafficManager></TrafficManager>
			{/* <TrafficLight color={"orange"} isActive={0}></TrafficLight> */}
		</div>
	);
}

export default App;
