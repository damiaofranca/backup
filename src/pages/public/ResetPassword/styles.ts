import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	min-height: 100vh;
	position: relative;
	align-items: center;
	justify-content: center;
	background-color: #f0f2f5;
`;

export const ContainerOrange = styled.div`
	top: 0%;
	width: 100%;
	height: 50vh;
	position: absolute;
	background-color: #f56e28;
`;

export const Box = styled.div`
	width: 28%;
	z-index: 1;
	padding: 33px;
	border-radius: 6px;
	background-color: #083d93;
`;

export const ContainerLogo = styled.div`
	flex: 1;
	display: flex;
	margin-bottom: 2rem;
	justify-content: center;
`;

export const Title = styled.h1`
	color: #ffffff;
	font-weight: 700;
	text-align: center;
`;

export const Description = styled.p`
	color: #ffffff;
	text-align: center;
	margin-bottom: 3rem;
`;

export const Actions = styled.div`
	display: flex;
	margin-top: 1.5rem;
	justify-content: flex-end;

	& > button:last-child {
		margin-left: 0.5rem;
	}
`;
