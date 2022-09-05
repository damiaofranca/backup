import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "../../../../utils/matchMedia";
import { EditPlan } from ".";

const mockPlan = {
	id: "dc63d962-6d51-4ce7-895c-dcfaaaaa094d9",
	name: "Brisa music",
	price: "19.90",
	created_at: new Date(),
	end_date: new Date(),
	start_date: new Date(),
	updated_at: null,
	deleted_at: null,
	is_active: true,
	description: "loren ipsun plan",
	grace_period: 30,
	number_of_devices: 4,
	external_service_id: 321,
};

describe("component of clients", () => {
	const isVisible = true;
	const { getByTestId, getByLabelText } = render(
		<MemoryRouter>
			<EditPlan
				idPlan="test1232cae21a-a123-ca343"
				onCancel={() => {}}
				onSubmit={() => {}}
				isVisible={isVisible}
				plan={mockPlan}
			/>
		</MemoryRouter>
	);
	const nameInput: any = getByLabelText("name-input-el");
	const priceInput: any = getByLabelText("price-input-el");
	const containerEl: any = getByLabelText("container-el");
	const modal: any = getByTestId("modal-plan-product-el");
	const descriptionInput: any = getByLabelText("description-input-el");
	const gracePeriodInput: any = getByLabelText("grace-period-input-el");
	const productActiveInput: any = getByLabelText("product-active-check-el");
	const numberDevicesInput: any = getByLabelText("number-of-devices-input-el");

	test("should render all components if isVisible props is true", () => {
		if (isVisible) {
			expect(modal).toBeInTheDocument();
			expect(nameInput).toBeInTheDocument();
			expect(priceInput).toBeInTheDocument();
			expect(containerEl).toBeInTheDocument();
			expect(gracePeriodInput).toBeInTheDocument();
			expect(descriptionInput).toBeInTheDocument();
			expect(productActiveInput).toBeInTheDocument();
			expect(numberDevicesInput).toBeInTheDocument();
		}
	});

	test("should not render all components if isVisible props is false", () => {
		if (!isVisible) {
			expect(modal).not.toBeInTheDocument();
			expect(nameInput).not.toBeInTheDocument();
			expect(priceInput).not.toBeInTheDocument();
			expect(containerEl).not.toBeInTheDocument();
			expect(gracePeriodInput).not.toBeInTheDocument();
			expect(descriptionInput).not.toBeInTheDocument();
			expect(productActiveInput).not.toBeInTheDocument();
			expect(numberDevicesInput).not.toBeInTheDocument();
		}
	});

	test("inputs must have the same value of the constant", () => {
		if (isVisible) {
			expect(nameInput.value).toEqual(mockPlan.name);
			expect(priceInput.value).toEqual(`${mockPlan.price}`);
			expect(descriptionInput.value).toEqual(mockPlan.description);
			expect(productActiveInput.checked).toEqual(mockPlan.is_active);
			expect(gracePeriodInput.value).toEqual(`${mockPlan.grace_period}`);
			expect(numberDevicesInput.value).toEqual(`${mockPlan.number_of_devices}`);
		}
	});

	test("inputs must receive some value", () => {
		if (isVisible) {
			fireEvent.change(nameInput, {
				target: { value: "namePlan" },
			});
			fireEvent.change(priceInput, {
				target: { value: "16.30" },
			});
			fireEvent.change(gracePeriodInput, {
				target: { value: 30 },
			});
			fireEvent.change(descriptionInput, {
				target: { value: "loren ipsun description" },
			});
			fireEvent.change(productActiveInput, {
				target: { value: true },
			});
			fireEvent.change(numberDevicesInput, {
				target: { value: 4 },
			});

			waitFor(() => {
				expect(priceInput.value).toEqual("16.30");
				expect(nameInput.value).toEqual("namePlan");
				expect(gracePeriodInput.value).toEqual("30");
				expect(numberDevicesInput.value).toEqual("4");
				expect(productActiveInput.value).toEqual(true);
				expect(descriptionInput.value).toEqual("loren ipsun description");
			});
		}
	});
});
