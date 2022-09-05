import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { DetailsProduct } from "./index";
import "../../../../utils/matchMedia";
import "@testing-library/jest-dom";

describe("test component", () => {
	const BrowseWithRouter = () => {
		const history = createMemoryHistory();
		return (
			<Router history={history}>
				<DetailsProduct />
			</Router>
		);
	};

	const { getByLabelText, getByTestId } = render(<BrowseWithRouter />);

	const inputName = getByLabelText("name-input-el");
	const containerMain = getByLabelText("container-el");
	const editDataButton = getByLabelText("edit-data-el");
	const tablePlans = getByTestId("table-details-product");
	const formDetails = getByTestId("form-details-product-el");
	const inputDescription = getByLabelText("description-input-el");
	const checkboxActive = getByLabelText("product-active-check-el");

	test("should render all components", () => {
		expect(inputName).toBeInTheDocument();
		expect(tablePlans).toBeInTheDocument();
		expect(formDetails).toBeInTheDocument();
		expect(containerMain).toBeInTheDocument();
		expect(checkboxActive).toBeInTheDocument();
		expect(editDataButton).toBeInTheDocument();
		expect(inputDescription).toBeInTheDocument();
	});
});
