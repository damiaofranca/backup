import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { ResetPassword } from ".";
import "../../../utils/matchMedia";

describe("login page", () => {
	const BrowseWithRouter = () => {
		const history = createMemoryHistory();
		return (
			<Router history={history}>
				<ResetPassword />
			</Router>
		);
	};

	const { getByLabelText } = render(<BrowseWithRouter />);

	const passwordInput: any = getByLabelText("password-input");
	const passwordAgainInput: any = getByLabelText("password-again-input");
	const buttonSubmit = getByLabelText("submit-button");
	test("login form elements should be in document ", () => {
		expect(passwordInput).toBeInTheDocument();
		expect(passwordAgainInput).toBeInTheDocument();
		expect(buttonSubmit).toBeInTheDocument();
	});

	test("password field should be accept text", () => {
		fireEvent.change(passwordInput, {
			target: { value: "passwordTest" },
		});
		expect(passwordInput.value).toBe("passwordTest");
	});

	test("password again field should be accept text", () => {
		fireEvent.change(passwordAgainInput, {
			target: { value: "passwordAgainTest" },
		});
		expect(passwordAgainInput.value).toBe("passwordAgainTest");
	});

	test("when click on submit, the passwords must by equals", async () => {
		fireEvent.click(buttonSubmit);
		fireEvent.change(passwordInput, {
			target: { value: "passwordAgainTest" },
		});

		fireEvent.change(passwordAgainInput, {
			target: { value: "passwordAgainTest" },
		});

		expect(passwordAgainInput.value).toBe(passwordInput.value);
	});
});
