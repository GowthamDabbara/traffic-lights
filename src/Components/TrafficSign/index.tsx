import React from "react";
import { MainWrapper, Time, Icon } from "./styled";

const TrafficSign = ({ countdown }) => {
	return (
		<MainWrapper>
			<Icon>{countdown < 4 ? `✋` : `🚶`}</Icon>
			<Time>{countdown}</Time>
		</MainWrapper>
	);
};

export default TrafficSign;
