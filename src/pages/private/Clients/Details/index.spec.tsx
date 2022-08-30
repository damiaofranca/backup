import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Details } from ".";
import "../../../../utils/matchMedia";

describe("test component of details", () => {
	const { getByTestId, getByLabelText } = render(
		<MemoryRouter>
			<Details />
		</MemoryRouter>
	);

	const containerActionsEl = getByLabelText("container-actions-el");
	const documentInputEl = getByLabelText("document-input-el");
	const emailInputEl = getByLabelText("email-input-el");
	const nameInputEl = getByLabelText("name-input-el");
	const containerEl = getByLabelText("container-el");
	const tableEl = getByLabelText("table-el");
	const formEl = getByTestId("form-el");

	test("should render all components", () => {
		expect(containerActionsEl).toBeInTheDocument();
		expect(documentInputEl).toBeInTheDocument();
		expect(emailInputEl).toBeInTheDocument();
		expect(nameInputEl).toBeInTheDocument();
		expect(containerEl).toBeInTheDocument();
		expect(tableEl).toBeInTheDocument();
		expect(formEl).toBeInTheDocument();
	});
});
