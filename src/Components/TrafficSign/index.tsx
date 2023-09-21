import React from "react";
import { MainWrapper, Time, Icon } from "./styled";
import { error } from "xstate/lib/actions";

interface signProps {
	countdown: number | null;
}

const TrafficSign: React.FC<signProps> = ({ countdown }) => {
	return (
		<MainWrapper>
			{countdown && <Icon>{countdown < 4 ? `✋` : `🚶`}</Icon>}
			{!countdown && <Icon>{`🚶`}</Icon>}
			{countdown && <Time>{countdown}</Time>}
		</MainWrapper>
	);
};

export default TrafficSign;
