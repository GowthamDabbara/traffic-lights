import React, { ReactNode, useEffect, useRef, useState } from "react";
import TrafficLight from "../TrafficLight";
import TrafficSign from "../TrafficSign";
import { MainWrapper, LightsWrapper, ButtonsWrapper } from "./styled";
import { TrafficMachine } from "../Machines/TrafficMachine";
import { useMachine } from "@xstate/react";

const TrafficManager = () => {
	const ORANGE_START_TIME = -4;
	const ORANGE_END_TIME = -6;
	const GREEN_START_TIME = 0;
	const RED_START_TIME = 8;

	// const [allCurrentLights, setAllCurrentLights] = useState({});
	// const [countdown, setCountdown] = useState(RED_START_TIME);
	const refCount = useRef(RED_START_TIME);
	const currentLight = useRef("red");
	const pause = useRef(0);
	const intervalID = useRef<ReturnType<typeof setInterval>>();

	const [current, send] = useMachine(TrafficMachine);
	const { allCurrentLights, countDown } = current.context;

	const skipLights = (forward) => {
		if (forward) {
			switch (currentLight.current) {
				case "red":
					// setAllCurrentLights({
					// 	red: 0,
					// 	orange: 0,
					// 	green: 1,
					// });
					// setCountdown("");
					send("TIMER", { countDown: "" });
					send("SELECT", {
						allCurrentLights: {
							red: 0,
							orange: 0,
							green: 1,
						},
					});
					refCount.current = GREEN_START_TIME;
					currentLight.current = "green";
					break;
				case "orange":
					// setAllCurrentLights({
					// 	red: 1,
					// 	orange: 0,
					// 	green: 0,
					// });
					// setCountdown(RED_START_TIME);
					send("TIMER", { countDown: "" });
					send("SELECT", {
						allCurrentLights: {
							red: 1,
							orange: 0,
							green: 0,
						},
					});
					refCount.current = RED_START_TIME;
					currentLight.current = "red";
					break;
				case "green":
					// setAllCurrentLights({
					// 	red: 0,
					// 	orange: 1,
					// 	green: 0,
					// });
					// send("TIMER", { countDown: "" });
					send("SELECT", {
						allCurrentLights: {
							red: 0,
							orange: 1,
							green: 0,
						},
					});
					refCount.current = ORANGE_START_TIME;
					currentLight.current = "orange";
					break;
			}
		} else {
			switch (currentLight.current) {
				case "orange":
					// setAllCurrentLights({
					// 	red: 0,
					// 	orange: 0,
					// 	green: 1,
					// });
					// setCountdown("");
					send("SELECT", {
						allCurrentLights: {
							red: 0,
							orange: 0,
							green: 1,
						},
					});
					send("TIMER", { countDown: "" });

					refCount.current = GREEN_START_TIME;
					currentLight.current = "green";
					break;
				case "green":
					// setAllCurrentLights({
					// 	red: 1,
					// 	orange: 0,
					// 	green: 0,
					// });
					// setCountdown(RED_START_TIME);

					send("SELECT", {
						allCurrentLights: {
							red: 1,
							orange: 0,
							green: 0,
						},
					});
					send("TIMER", { countDown: RED_START_TIME });

					refCount.current = RED_START_TIME;
					currentLight.current = "red";
					break;
				case "red":
					// setAllCurrentLights({
					// 	red: 0,
					// 	orange: 1,
					// 	green: 0,
					// });
					// setCountdown("");
					send("SELECT", {
						allCurrentLights: {
							red: 0,
							orange: 1,
							green: 0,
						},
					});
					send("TIMER", { countDown: "" });

					refCount.current = ORANGE_START_TIME;
					currentLight.current = "orange";
					break;
			}
		}
		if (pause.current === 0) {
			startLights();
		}
	};

	const switchLights = () => {
		switch (refCount.current) {
			case GREEN_START_TIME:
				currentLight.current = "green";
				send("TIMER", { countDown: "" });
				send("SELECT", {
					allCurrentLights: {
						red: 0,
						orange: 0,
						green: 1,
					},
				});
				// setCountdown("");
				// setAllCurrentLights({
				// 	red: 0,
				// 	orange: 0,
				// 	green: 1,
				// });
				break;
			case ORANGE_START_TIME:
				currentLight.current = "orange";
				send("SELECT", {
					allCurrentLights: {
						red: 0,
						orange: 1,
						green: 0,
					},
				});
				// setAllCurrentLights({
				// 	red: 0,
				// 	orange: 1,
				// 	green: 0,
				// });
				break;
			case ORANGE_END_TIME:
				refCount.current = RED_START_TIME;
				currentLight.current = "red";

				send("TIMER", { countDown: RED_START_TIME });
				// setCountdown(RED_START_TIME);
				send("SELECT", {
					allCurrentLights: {
						red: 1,
						orange: 0,
						green: 0,
					},
				});
			// setAllCurrentLights({
			// 	red: 1,
			// 	orange: 0,
			// 	green: 0,
			// });
		}
	};

	const startLights = () => {
		clearInterval(intervalID.current);
		// if (typeof countDown !== Number) {
		// 	throw new Error("type");
		// }
		let temp: number | string = countDown;
		if (typeof temp === "string") {
			throw new Error("temp is not a number");
		}
		if (!isNaN(temp)) {
			intervalID.current = setInterval(() => {
				if (refCount.current > 0) {
					// setCountdown((oldCountdown) => oldCountdown - 1);
					send("TIMER", { countDown: temp - 1 });
				}
				refCount.current = refCount.current - 1;
				switchLights();
			}, 1000);
		}
	};

	const init = () => {
		send("SELECT", { allCurrentLights: { red: 1, orange: 0, green: 0 } });
		// setAllCurrentLights({
		// 	red: 1,
		// 	orange: 0,
		// 	green: 0,
		// });
		startLights();
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<MainWrapper>
				<LightsWrapper>
					<TrafficLight
						color={"red"}
						isactive={allCurrentLights.red}
					></TrafficLight>
					<TrafficLight
						color={"orange"}
						isactive={allCurrentLights.orange}
					></TrafficLight>
					<TrafficLight
						color={"green"}
						isactive={allCurrentLights.green}
					></TrafficLight>
				</LightsWrapper>
				<TrafficSign countdown={countDown} />
			</MainWrapper>
			<ButtonsWrapper>
				<button
					onClick={() => {
						pause.current = 1;
						clearInterval(intervalID.current);
					}}
				>
					pause
				</button>
				<button
					onClick={() => {
						pause.current = 0;
						startLights();
					}}
				>
					Resume
				</button>
			</ButtonsWrapper>
			<ButtonsWrapper>
				<button
					onClick={() => {
						skipLights(false);
					}}
				>
					Backward
				</button>
				<button
					onClick={() => {
						skipLights(true);
					}}
				>
					Forward
				</button>
			</ButtonsWrapper>
		</>
	);
};

export default TrafficManager;
