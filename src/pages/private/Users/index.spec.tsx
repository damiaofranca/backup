import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import { Users } from ".";

test("should render all components", () => {
	const { getByTestId, getByLabelText } = render(
		<MemoryRouter>
			<Users />
		</MemoryRouter>
	);
	expect(getByLabelText("container-el")).toBeInTheDocument();
	expect(getByTestId("table-users-el")).toBeInTheDocument();
	expect(getByTestId("load-data-el")).toBeInTheDocument();
	expect(getByTestId("new-data-el")).toBeInTheDocument();
});
