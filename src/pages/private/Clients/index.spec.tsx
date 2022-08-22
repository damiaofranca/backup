import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import { Clients } from ".";

test("should render all components", () => {
	const { getByTestId } = render(
		<MemoryRouter>
			<Clients />
		</MemoryRouter>
	);
	// expect(getByTestId("container-els")).toBeInTheDocument();
	// expect(getByTestId("name-input-el")).toBeInTheDocument();
	// expect(getByTestId("term-input-el")).toBeInTheDocument();
	// expect(getByTestId("email-input-el")).toBeInTheDocument();
	// expect(getByTestId("source-input-el")).toBeInTheDocument();
	// expect(getByTestId("medium-input-el")).toBeInTheDocument();
	// expect(getByTestId("campaign-input-el")).toBeInTheDocument();
});
