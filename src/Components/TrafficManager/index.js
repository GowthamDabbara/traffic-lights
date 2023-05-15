import React, { useEffect, useRef, useState } from "react";
import TrafficLight from "../TrafficLight";
import TrafficSign from "../TrafficSign";
import { MainWrapper, LightsWrapper, ButtonsWrapper } from "./styled";

const TrafficManager = () => {
	const [currentLight, setCurrentLight] = useState({});
	const [countdown, setCountdown] = useState(8);
	const refCount = useRef(8);
	const pause = useRef(0);

	const startLights = () => {
		setCurrentLight({
			red: 1,
			orange: 0,
			green: 0,
		});
		let intervalID = setInterval(() => {
			if (pause.current === 0) {
				refCount.current = refCount.current - 1;
			}
			if (pause.current === 0 && refCount.current > 0) {
				setCountdown((oldCountdown) => oldCountdown - 1);
			}
			switch (refCount.current) {
				case 0:
					setCountdown("");
					setCurrentLight({
						red: 0,
						orange: 0,
						green: 1,
					});
					break;
				case -4:
					setCurrentLight({
						red: 0,
						orange: 1,
						green: 0,
					});
					break;
				case -6:
					refCount.current = 8;
					setCountdown(8);
					setCurrentLight({
						red: 1,
						orange: 0,
						green: 0,
					});
			}
		}, 1000);

		return () => {
			clearInterval(intervalID);
		};
	};

	useEffect(() => {
		startLights();
	}, []);

	return (
		<>
			<MainWrapper>
				<LightsWrapper>
					<TrafficLight
						color={"red"}
						isactive={currentLight.red}
					></TrafficLight>
					<TrafficLight
						color={"orange"}
						isactive={currentLight.orange}
					></TrafficLight>
					<TrafficLight
						color={"green"}
						isactive={currentLight.green}
					></TrafficLight>
				</LightsWrapper>
				<TrafficSign countdown={countdown} />
			</MainWrapper>
			<ButtonsWrapper>
				<button
					onClick={() => {
						console.log("heelos");
						pause.current = 1;
					}}
				>
					Pause
				</button>
				<button
					onClick={() => {
						pause.current = 0;
					}}
				>
					Resume
				</button>
			</ButtonsWrapper>
		</>
	);
};

export default TrafficManager;
