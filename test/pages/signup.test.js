import * as React from "react";
import { useRouter } from "next/router";
import { render, act, fireEvent } from "@testing-library/react";

import SignUp from "../../pages/signup";
import { useAuth } from "../../context/Auth";

jest.mock("next/router");
jest.mock("../../context/Auth");

describe('SignUp', () => {
    let expectedSignUp, expectedEmail, expectedPassword, expectedRouterPush;

    beforeEach(() => {
      expectedRouterPush = jest.fn();
      expectedSignUp = jest.fn();
      expectedSignUp.mockResolvedValue("");
      expectedEmail = "dsaaaa@dsa.com";
      expectedPassword = "asd123";
      
      useRouter.mockReturnValue({ push: expectedRouterPush });
      useAuth.mockReturnValue({
        signup: expectedSignUp,
        user: false
      });
    });

    test('should redirect to index on sign up', async () => {
        const { getByLabelText, getByText } = render(<SignUp />);
        const email = getByLabelText("Email");
        const password = getByLabelText("Password");
        const signUpButton = getByText("Sign up");

        await act(async () => {
            fireEvent.change(email, { target: { value: expectedEmail } });
            fireEvent.change(password, { target: { value: expectedPassword } });
        });
        fireEvent.click(signUpButton);
        
        await act(async () => {
          expect(expectedSignUp).toHaveBeenCalledTimes(1);
          expect(expectedSignUp).toHaveBeenCalledWith(expectedEmail, expectedPassword);
        });

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).toHaveBeenCalledWith("/");
    })

    test('should show error message', async () => {
      expectedSignUp.mockRejectedValue({
        message: "Invalid password"
      })

      const { getByLabelText, getByText } = render(<SignUp />);
      const email = getByLabelText("Email");
      const password = getByLabelText("Password");
      const signUpButton = getByText("Sign up");

      await act(async () => {
        fireEvent.change(email, { target: { value: expectedEmail } });
        fireEvent.change(password, { target: { value: "asd" } });
      });
      fireEvent.click(signUpButton);

      await act(async () => {
        expect(expectedSignUp).toHaveBeenCalledTimes(1);
        expect(expectedSignUp).toHaveBeenCalledWith(
          expectedEmail,
          "asd"
        )
      });

      getByText("⛔ Invalid password");
    })
    
})