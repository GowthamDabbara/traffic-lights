import React, { useEffect, useRef, useState } from "react";
import { Bulb } from "./styled";

interface LightProps {
	color: string;
	isactive: number;
}

const TrafficLight: React.FC<LightProps> = ({ color, isactive }) => {
	const basecolor = useRef("");
	const activecolor = useRef("");

	const setColor = () => {
		switch (color) {
			case "red":
				basecolor.current = "#880B0B";
				activecolor.current = "#FF0000";
				break;
			case "orange":
				basecolor.current = "#AFAF32";
				activecolor.current = "#FFFF00";
				break;
			case "green":
				basecolor.current = "#3A863A";
				activecolor.current = "#32CD32";
				break;
		}
	};

	useEffect(() => {
		setColor();
	}, []);

	return (
		<Bulb
			isactive={isactive}
			basecolor={basecolor.current}
			activecolor={activecolor.current}
		></Bulb>
	);
};

export default TrafficLight;
