import { render } from "@testing-library/react";
import { AddUser } from ".";
import "../../../utils/matchMedia";

test("should render all components", () => {
	const { getByTestId } = render(
		<AddUser onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	expect(getByTestId("form-el")).toBeInTheDocument();
	expect(getByTestId("name-input-form")).toBeInTheDocument();
	expect(getByTestId("email-input-form")).toBeInTheDocument();
	expect(getByTestId("password-input-form")).toBeInTheDocument();
});
