import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "../../../../utils/matchMedia";
import "@testing-library/jest-dom";
import { Details } from ".";

test("should render all components", () => {
	const { getByTestId } = render(
		<MemoryRouter>
			<Details />
		</MemoryRouter>
	);
	expect(getByTestId("container-el")).toBeInTheDocument();
	expect(getByTestId("form-el")).toBeInTheDocument();
	expect(getByTestId("name-input-el")).toBeInTheDocument();
	expect(getByTestId("email-input-el")).toBeInTheDocument();
	expect(getByTestId("document-input-el")).toBeInTheDocument();
	expect(getByTestId("container-actions-el")).toBeInTheDocument();
	expect(getByTestId("table-el")).toBeInTheDocument();
});
