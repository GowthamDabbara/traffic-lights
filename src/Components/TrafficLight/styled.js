import styled from "styled-components";

export const Bulb = styled.div`
	width: 80px;
	height: 80px;
	border: 1px solid black;
	border-radius: 100%;
	background-color: ${(props) =>
		props.isactive ? props.activecolor : props.basecolor};
`;
