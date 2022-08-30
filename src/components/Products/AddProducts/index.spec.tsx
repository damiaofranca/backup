import { fireEvent, render, waitFor } from "@testing-library/react";
import { AddProduct } from ".";
import "../../../utils/matchMedia";

describe("test add product modal", () => {
	const { getByTestId, getByLabelText } = render(
		<AddProduct onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	const formElement: any = getByLabelText("form-el");
	const priceElement: any = getByLabelText("price-el");
	const nameElement: any = getByLabelText("name-input-el");
	const modalElement: any = getByTestId("modal-product-el");
	const descriptionElement: any = getByLabelText("description-input-el");
	const gracePeriodElement: any = getByLabelText("grace-period-input-el");
	const numberOfDevicesElement: any = getByLabelText("number-of-devices-el");
	const productActiveElement: any = getByLabelText("product-active-check-el");

	test("should render all components", () => {
		expect(formElement).toBeInTheDocument();
		expect(nameElement).toBeInTheDocument();
		expect(priceElement).toBeInTheDocument();
		expect(modalElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(gracePeriodElement).toBeInTheDocument();
		expect(productActiveElement).toBeInTheDocument();
		expect(numberOfDevicesElement).toBeInTheDocument();
	});

	test("should form fields accept values", async () => {
		fireEvent.change(nameElement, {
			target: {
				value: "productTest",
			},
		});
		fireEvent.change(priceElement, {
			target: {
				value: "12.13",
			},
		});
		fireEvent.change(descriptionElement, {
			target: {
				value: "loren ipsun",
			},
		});
		fireEvent.change(gracePeriodElement, {
			target: {
				value: "30",
			},
		});
		fireEvent.change(numberOfDevicesElement, {
			target: {
				value: "3",
			},
		});

		fireEvent.click(productActiveElement);

		await waitFor(() => {
			expect(nameElement.value).toBe("productTest");
			expect(priceElement.value).toBe("12.13");
			expect(descriptionElement.value).toBe("loren ipsun");
			expect(gracePeriodElement.value).toBe("30");
			expect(numberOfDevicesElement.value).toBe("3");
			expect(productActiveElement.checked).toEqual(true);
		});
	});
});
