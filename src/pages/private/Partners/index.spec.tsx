import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import { Partners } from ".";

describe("component test partners", () => {
	const { getByTestId, getByLabelText } = render(
		<MemoryRouter>
			<Partners />
		</MemoryRouter>
	);

	const containerEl = getByLabelText("container-el");
	const tableEl = getByTestId("table-partners-el");
	const newPartnerEl = getByTestId("new-partner-el");

	test("should render all components", () => {
		expect(containerEl).toBeInTheDocument();
		expect(tableEl).toBeInTheDocument();
		expect(newPartnerEl).toBeInTheDocument();
	});
});
