import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import { Leads } from ".";

test("should render all components", () => {
	const { getByLabelText } = render(
		<MemoryRouter>
			<Leads />
		</MemoryRouter>
	);
	expect(getByLabelText("container-el")).toBeInTheDocument();
	expect(getByLabelText("table-el")).toBeInTheDocument();
});
