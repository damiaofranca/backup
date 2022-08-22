import { render } from "@testing-library/react";
import { EditPassword } from ".";
import "../../../utils/matchMedia";

test("should render all components", () => {
	const { getByTestId } = render(
		<EditPassword
			onCancel={() => {}}
			onSubmit={() => {}}
			user={{ token: "" }}
			isVisible
		/>
	);
	expect(getByTestId("modal-el")).toBeInTheDocument();
	expect(getByTestId("form-el")).toBeInTheDocument();
	expect(getByTestId("password-input-form")).toBeInTheDocument();
});
