import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Clients } from ".";
import "../../../utils/matchMedia";

describe("component of clients", () => {
	const { getByTestId, getByLabelText } = render(
		<MemoryRouter>
			<Clients />
		</MemoryRouter>
	);
	const containerEl = getByLabelText("container-el");
	const tableEl = getByTestId("table-clients-el");
	test("should render all components", () => {
		expect(containerEl).toBeInTheDocument();
		expect(tableEl).toBeInTheDocument();
	});
});
