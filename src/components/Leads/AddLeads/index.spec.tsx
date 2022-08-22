import { render } from "@testing-library/react";
import "../../../utils/matchMedia";
import { AddLeads } from ".";

test("should render all components", () => {
	const { getByTestId } = render(
		<AddLeads onCancel={() => {}} onSubmit={() => {}} isVisible />
	);

	expect(getByTestId("form-element")).toBeInTheDocument();
	expect(getByTestId("name-input-el")).toBeInTheDocument();
	expect(getByTestId("term-input-el")).toBeInTheDocument();
	expect(getByTestId("email-input-el")).toBeInTheDocument();
	expect(getByTestId("source-input-el")).toBeInTheDocument();
	expect(getByTestId("medium-input-el")).toBeInTheDocument();
	expect(getByTestId("campaign-input-el")).toBeInTheDocument();
});
