import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "../../../utils/matchMedia";
import Login from ".";

describe("login page", () => {
	const { getByLabelText } = render(<Login />);
	const emailInput: any = getByLabelText("email-input");
	const passwordInput: any = getByLabelText("password-input");
	const buttonSubmit = getByLabelText("submit-button");
	test("login form elements should be in document ", () => {
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(buttonSubmit).toBeInTheDocument();
	});

	test("email field should be accept text", () => {
		fireEvent.change(emailInput, {
			target: { value: "testing" },
		});
		expect(emailInput.value).toBe("testing");
	});

	test("password field should be accept text", () => {
		fireEvent.change(passwordInput, {
			target: { value: "passwordTest" },
		});
		expect(passwordInput.value).toBe("passwordTest");
	});
});
