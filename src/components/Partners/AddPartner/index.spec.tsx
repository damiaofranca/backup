import { render } from "@testing-library/react";
import { AddPartner } from ".";
import "../../../utils/matchMedia";

test("should render all components", () => {
	const { getByTestId } = render(
		<AddPartner onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	expect(getByTestId("name-input-el")).toBeInTheDocument();
	expect(getByTestId("modal-el")).toBeInTheDocument();
});
