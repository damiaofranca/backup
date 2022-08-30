import {
	fireEvent,
	getByLabelText,
	render,
	waitFor,
} from "@testing-library/react";
import { AddPartner } from ".";
import "../../../utils/matchMedia";

describe("render component", () => {
	const { getByTestId, getByLabelText } = render(
		<AddPartner onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	const modalElement = getByTestId("modal-partner-el");
	const nameInput: any = getByLabelText("name-input-el");
	test("should render all components", () => {
		expect(modalElement).toBeInTheDocument();
		expect(nameInput).toBeInTheDocument();
	});

	test("should input form aceppt text as value", async () => {
		fireEvent.change(nameInput, {
			target: { value: "namePartner" },
		});

		await waitFor(() => {
			expect(nameInput.value).toBe("namePartner");
		});
	});
});
