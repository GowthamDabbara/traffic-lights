import React, { useEffect, useRef, useState } from "react";
import { Bulb } from "./styled";

const TrafficLight = ({ color, isActive }) => {
	const baseColor = useRef("");
	const activeColor = useRef("");
	const [dummy, setDummy] = useState("");

	const setColor = () => {
		switch (color) {
			case "red":
				baseColor.current = "#880B0B";
				activeColor.current = "#FF0000";
				break;
			case "orange":
				baseColor.current = "#AFAF32";
				activeColor.current = "#FFFF00";
				break;
			case "green":
				baseColor.current = "#3A863A";
				activeColor.current = "#32CD32";
				break;
		}
		setDummy("");
	};

	useEffect(() => {
		setColor();
	}, []);

	return (
		<Bulb
			isActive={isActive}
			baseColor={baseColor.current}
			activeColor={activeColor.current}
		></Bulb>
	);
};

export default TrafficLight;
