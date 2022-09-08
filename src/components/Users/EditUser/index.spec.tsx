import { fireEvent, render, waitFor } from "@testing-library/react";
import { EditUser } from ".";
import "../../../utils/matchMedia";

describe("test component of add user", () => {
	const { getByTestId, getByLabelText } = render(
		<EditUser
			onCancel={() => {}}
			onSubmit={() => {}}
			isVisible
			user={{
				name: "juantest",
				email: "testemail213@gmail.com",
				id: "sa21a-1ds23-cdsa1-1acc23",
				admin: false,
			}}
		/>
	);

	const formElement = getByTestId("form-user-el");
	const nameElement: any = getByLabelText("name-input-form");
	const emailElement: any = getByLabelText("email-input-form");

	test("should render all components", () => {
		expect(formElement).toBeInTheDocument();
		expect(nameElement).toBeInTheDocument();
		expect(emailElement).toBeInTheDocument();
	});

	test("check if already values on inputs", () => {
		expect(nameElement.value).toEqual("juantest");
		expect(emailElement.value).toEqual("testemail213@gmail.com");
	});

	test("check if field form change the values", () => {
		fireEvent.change(nameElement, {
			target: { value: "user21Test" },
		});
		fireEvent.change(emailElement, {
			target: { value: "test@email.com" },
		});

		waitFor(() => {
			expect(nameElement.value).toEqual("user21Test");
			expect(emailElement.value).toEqual("test@email.com");
		});
	});
});
