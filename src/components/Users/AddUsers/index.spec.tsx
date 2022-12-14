import { fireEvent, render, waitFor } from "@testing-library/react";
import { AddUser } from ".";
import "../../../utils/matchMedia";

describe("test component of add user", () => {
	const { getByTestId, getByLabelText } = render(
		<AddUser onCancel={() => {}} onSubmit={() => {}} isVisible />
	);

	const formElement = getByTestId("form-user-el");
	const nameElement: any = getByLabelText("name-input-form");
	const emailElement: any = getByLabelText("email-input-form");
	const passwordElement: any = getByLabelText("password-input-form");

	test("should render all components", () => {
		expect(formElement).toBeInTheDocument();
		expect(nameElement).toBeInTheDocument();
		expect(emailElement).toBeInTheDocument();
		expect(passwordElement).toBeInTheDocument();
	});

	test("check if field form accept values", () => {
		fireEvent.change(nameElement, {
			target: { value: "user21Test" },
		});
		fireEvent.change(emailElement, {
			target: { value: "test@email.com" },
		});
		fireEvent.change(passwordElement, {
			target: { value: "12345678" },
		});

		waitFor(() => {
			expect(nameElement.value).toEqual("user21Test");
			expect(emailElement.value).toEqual("test@email.com");
			expect(passwordElement.value).toEqual("12345678");
		});
	});
});
