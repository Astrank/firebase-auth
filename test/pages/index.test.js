import * as React from "react";
import { render } from "@testing-library/react";

import { useAuth } from "../../context/Auth";
import Home from "../../pages/index";

jest.mock("../../context/Auth");

describe('Home', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            user: {
                email: "asd@asd.com"
            }
        });
    });

    test('should welcome users with their names', () => {
        const { getByText } = render(<Home />);

        getByText(`Hello asd@asd.com!`);
    });
})