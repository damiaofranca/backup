import { fireEvent, render, waitFor } from "@testing-library/react";
import "../../../utils/matchMedia";
import { AddLeads } from ".";

describe("test form add leads", () => {
	const { getByLabelText, getByTestId } = render(
		<AddLeads onCancel={() => {}} onSubmit={() => {}} isVisible />
	);
	const formContainer: any = getByTestId("form-leads-element");
	const nameInput: any = getByLabelText("name-input-el");
	const termInput: any = getByLabelText("email-input-el");
	const emailInput: any = getByLabelText("campaign-input-el");
	const sourceInput: any = getByLabelText("medium-input-el");
	const mediumInput: any = getByLabelText("source-input-el");
	const campaignInput: any = getByLabelText("term-input-el");

	test("should render all components", () => {
		expect(formContainer).toBeInTheDocument();
		expect(nameInput).toBeInTheDocument();
		expect(termInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(sourceInput).toBeInTheDocument();
		expect(mediumInput).toBeInTheDocument();
		expect(campaignInput).toBeInTheDocument();
	});

	test("should form filds have text values ", async () => {
		fireEvent.change(nameInput, {
			target: { value: "nameTest" },
		});
		fireEvent.change(termInput, {
			target: { value: "termTest" },
		});
		fireEvent.change(emailInput, {
			target: { value: "emailTest" },
		});
		fireEvent.change(sourceInput, {
			target: { value: "sourceTest" },
		});
		fireEvent.change(mediumInput, {
			target: { value: "mediumTest" },
		});
		fireEvent.change(campaignInput, {
			target: { value: "campaignTest" },
		});

		await waitFor(() => {
			expect(nameInput.value).toBe("nameTest");
			expect(termInput.value).toBe("termTest");
			expect(emailInput.value).toBe("emailTest");
			expect(sourceInput.value).toBe("sourceTest");
			expect(mediumInput.value).toBe("mediumTest");
			expect(campaignInput.value).toBe("campaignTest");
		});
	});
});
