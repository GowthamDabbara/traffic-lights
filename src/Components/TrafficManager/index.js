import React, { useEffect, useRef, useState } from "react";
import TrafficLight from "../TrafficLight";
import TrafficSign from "../TrafficSign";
import { MainWrapper, LightsWrapper, ButtonsWrapper } from "./styled";

const TrafficManager = () => {
	const ORANGE_START_TIME = -4;
	const ORANGE_END_TIME = -6;
	const GREEN_START_TIME = 0;
	const RED_START_TIME = 8;

	const [allCurrentLights, setAllCurrentLights] = useState({});
	const [countdown, setCountdown] = useState(RED_START_TIME);
	const refCount = useRef(RED_START_TIME);
	const currentLight = useRef("red");
	const intervalID = useRef();

	const skipLights = (forward) => {
		if (forward) {
			switch (currentLight.current) {
				case "red":
					setAllCurrentLights({
						red: 0,
						orange: 0,
						green: 1,
					});
					setCountdown("");
					refCount.current = GREEN_START_TIME;
					currentLight.current = "green";
					break;
				case "orange":
					setAllCurrentLights({
						red: 1,
						orange: 0,
						green: 0,
					});
					setCountdown(RED_START_TIME);
					refCount.current = RED_START_TIME;
					currentLight.current = "red";
					break;
				case "green":
					setAllCurrentLights({
						red: 0,
						orange: 1,
						green: 0,
					});
					refCount.current = ORANGE_START_TIME;
					currentLight.current = "orange";
					break;
			}
		} else {
			switch (currentLight.current) {
				case "orange":
					setAllCurrentLights({
						red: 0,
						orange: 0,
						green: 1,
					});
					setCountdown("");
					refCount.current = GREEN_START_TIME;
					currentLight.current = "green";
					break;
				case "green":
					setAllCurrentLights({
						red: 1,
						orange: 0,
						green: 0,
					});
					setCountdown(RED_START_TIME);
					refCount.current = RED_START_TIME;
					currentLight.current = "red";
					break;
				case "red":
					setAllCurrentLights({
						red: 0,
						orange: 1,
						green: 0,
					});
					setCountdown("");
					refCount.current = ORANGE_START_TIME;
					currentLight.current = "orange";
					break;
			}
		}
		startLights();
	};

	const switchLights = () => {
		switch (refCount.current) {
			case GREEN_START_TIME:
				currentLight.current = "green";
				setCountdown("");
				setAllCurrentLights({
					red: 0,
					orange: 0,
					green: 1,
				});
				break;
			case ORANGE_START_TIME:
				currentLight.current = "orange";
				setAllCurrentLights({
					red: 0,
					orange: 1,
					green: 0,
				});
				break;
			case ORANGE_END_TIME:
				refCount.current = RED_START_TIME;
				currentLight.current = "red";
				setCountdown(RED_START_TIME);
				setAllCurrentLights({
					red: 1,
					orange: 0,
					green: 0,
				});
		}
	};

	const startLights = () => {
		clearInterval(intervalID.current);
		intervalID.current = setInterval(() => {
			if (refCount.current > 0) {
				setCountdown((oldCountdown) => oldCountdown - 1);
			}
			refCount.current = refCount.current - 1;
			switchLights();
		}, 1000);
	};

	const init = () => {
		setAllCurrentLights({
			red: 1,
			orange: 0,
			green: 0,
		});
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
				<TrafficSign countdown={countdown} />
			</MainWrapper>
			<ButtonsWrapper>
				<button
					onClick={() => {
						clearInterval(intervalID.current);
					}}
				>
					Pause
				</button>
				<button
					onClick={() => {
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
