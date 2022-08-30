import React from "react";

import { Container, ContainerMessage } from "./styles";

const Home: React.FC = () => {
	return (
		<Container aria-label="container-el">
			<ContainerMessage aria-label="container-message-el">
				<h1>Em breve teremos o "Dashboard"</h1>
			</ContainerMessage>
		</Container>
	);
};

export default Home;
