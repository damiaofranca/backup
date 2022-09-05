import { fireEvent, render, waitFor } from "@testing-library/react";
import { AddProduct } from ".";
import "../../../utils/matchMedia";

describe("test add product modal", () => {
	const { getByTestId, getByLabelText } = render(
		<AddProduct onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	const formElement: any = getByLabelText("form-el");
	const nameElement: any = getByLabelText("name-input-el");
	const modalElement: any = getByTestId("modal-product-el");
	const descriptionElement: any = getByLabelText("description-input-el");
	const productActiveElement: any = getByLabelText("product-active-check-el");

	test("should render all components", () => {
		expect(formElement).toBeInTheDocument();
		expect(nameElement).toBeInTheDocument();
		expect(modalElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(productActiveElement).toBeInTheDocument();
	});

	test("should form fields accept values", async () => {
		fireEvent.change(nameElement, {
			target: {
				value: "productTest",
			},
		});

		fireEvent.change(descriptionElement, {
			target: {
				value: "loren ipsun",
			},
		});

		fireEvent.click(productActiveElement);

		await waitFor(() => {
			expect(nameElement.value).toBe("productTest");
			expect(descriptionElement.value).toBe("loren ipsun");
			expect(productActiveElement.checked).toEqual(true);
		});
	});
});
