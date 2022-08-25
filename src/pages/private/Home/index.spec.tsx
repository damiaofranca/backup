import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import Home from ".";

test("should render all components", () => {
	const { getByTestId } = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	expect(getByTestId("container-el")).toBeInTheDocument();
	expect(getByTestId("container-message-el")).toBeInTheDocument();
});
