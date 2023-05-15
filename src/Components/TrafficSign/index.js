import React from "react";
import { MainWrapper, Time, Icon } from "./styled";

const TrafficSign = ({ countdown }) => {
	return (
		<MainWrapper>
			{countdown < 4 && <Icon>✋</Icon>}
			{countdown >= 4 && <Icon>🚶</Icon>}
			{/* <Icon>{countdown < 4 ? `✋` : `🚶`}</Icon> */}
			<Time>{countdown}</Time>
		</MainWrapper>
	);
};

export default TrafficSign;
