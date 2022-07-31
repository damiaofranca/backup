import { render, waitFor } from "@testing-library/react";
import ChangeUserPassword from "./index";

it("render components corrects", async () => {
	const { queryByTestId } = render(<ChangeUserPassword />);

	// expect(queryByTestId("resetPassowordInputId")).toBeInTheDocument();
	// expect(queryByTestId("resetPassowordAgainInputId")).toBeInTheDocument();
});
