import { render } from "@testing-library/react";
import { AddProduct } from ".";
import "../../../utils/matchMedia";

test("should render all components", () => {
	const { getByTestId } = render(
		<AddProduct onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	expect(getByTestId("modal-el")).toBeInTheDocument();
	expect(getByTestId("form-element")).toBeInTheDocument();
	expect(getByTestId("name-input-el")).toBeInTheDocument();
	expect(getByTestId("description-input-el")).toBeInTheDocument();
	expect(getByTestId("grace_period-input-el")).toBeInTheDocument();
	expect(getByTestId("product-active-input-el")).toBeInTheDocument();
	expect(getByTestId("number_of_devices-input-el")).toBeInTheDocument();
});
