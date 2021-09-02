import * as React from "react";
import { render } from "@testing-library/react";

import { Header } from "../../components/Header";
import { useAuth } from "../../context/Auth";

jest.mock("../../context/Auth");

describe('Header', () => {
    beforeEach(() => {
        const expectedLogout = jest.fn();

        useAuth.mockReturnValue({
            user: "asd@asd.com",
            logout: expectedLogout,
        })
    });

    test('should show logout when user exists', () => {
        const { getByText } = render(<Header />);

        getByText("Log out");
    })

    test("should show login and signup when there's no user", () => {
        useAuth.mockReturnValue({
          user: false,
        });
        const { getByText } = render(<Header />);

        getByText("Log in");
        getByText("Sign up");
    });
})
