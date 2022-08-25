import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import { Partners } from ".";

test("should render all components", () => {
	const { getByTestId } = render(
		<MemoryRouter>
			<Partners />
		</MemoryRouter>
	);
	expect(getByTestId("container-el")).toBeInTheDocument();
	expect(getByTestId("table-el")).toBeInTheDocument();
});
