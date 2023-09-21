import React from "react";
import { MainWrapper, Time, Icon } from "./styled";
import { error } from "xstate/lib/actions";

interface signProps {
	countdown: number;
}

const TrafficSign: React.FC<signProps> = ({ countdown }) => {
	if (!countdown) {
		throw new Error("countdown is null in TraficSign component");
	}

	return (
		<MainWrapper>
			<Icon>{countdown < 4 ? `✋` : `🚶`}</Icon>
			<Time>{countdown}</Time>
		</MainWrapper>
	);
};

export default TrafficSign;
