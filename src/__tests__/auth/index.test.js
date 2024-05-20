import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/pages/index";
import { AuthProvider } from "@/contexts";
import { ReactQueryProvider } from "@/contexts/ReactQuery";

import "@testing-library/jest-dom";

const setupLogin = () => {
  const { container, getByText } = render(
    <AuthProvider>
      <ReactQueryProvider>
        <Home />
      </ReactQueryProvider>
    </AuthProvider>
  );
  const submit = screen.getByRole("button", { name: "Login / Register" });
  const email = screen.queryByPlaceholderText("Email");
  const password = screen.queryByPlaceholderText("Password");
  return {
    submit,
    email,
    password,
    container,
    getByText,
  };
};

const setupLogout = () => {
  localStorage.setItem("email", "email@gmail.com");
  const { container, getByText } = render(
    <AuthProvider>
      <ReactQueryProvider>
        <Home />
      </ReactQueryProvider>
    </AuthProvider>
  );
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  return {
    logoutButton,
    container,
    getByText,
  };
};

describe("Login func", () => {
  it("Required email and password", async () => {
    const { submit, getByText } = setupLogin();
    fireEvent.click(submit);

    await waitFor(() => {
      const emailRequired = getByText(/Please input your email/i);
      const passwordRequired = getByText(/Please input your password/i);
      expect(emailRequired).toBeInTheDocument();
      expect(passwordRequired).toBeInTheDocument();
    });
  });

  it("Validate email", async () => {
    const { getByText, email, submit } = setupLogin();
    fireEvent.change(email, { target: { value: "invalid email" } });
    fireEvent.click(submit);
    await waitFor(() => {
      const emailInvalid = getByText(/Email is not a valid/i);
      expect(emailInvalid).toBeInTheDocument();
    });
  });

  it("Password min 8 character", async () => {
    const { getByText, password, submit } = setupLogin();
    fireEvent.change(password, { target: { value: "1234" } });
    fireEvent.click(submit);
    await waitFor(() => {
      const passwordMin = getByText(/Password must be at least 8 characters/i);
      expect(passwordMin).toBeInTheDocument();
    });
  });

  it("Login success and store localstorage", async () => {
    const { getByText, email, password, submit } = setupLogin();
    fireEvent.change(email, { target: { value: "email@gmail.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });
    fireEvent.click(submit);
    await waitFor(() => {
      const userEmail = getByText(/email@gmail.com/i);
      const localstorageEmail = localStorage.getItem("email");
      expect(userEmail).toBeInTheDocument();
      expect(localstorageEmail).toEqual("email@gmail.com");
    });
  });
});

describe("Logged and share", () => {
  it("Load email form locastorage", async () => {
    const { getByText } = setupLogout();
    const userEmail = getByText(/email@gmail.com/i);
    expect(userEmail).toBeInTheDocument();
  });

  it("Show logout button after login", async () => {
    const { logoutButton } = setupLogout();
    expect(logoutButton).toBeInTheDocument();
  });

  it("Logout and clear storage", async () => {
    const { logoutButton, getByText } = setupLogout();
    fireEvent.click(logoutButton);
    await waitFor(() => {
      const localstorageEmail = localStorage.getItem("email");
      const loginButton = getByText(/Login \/ Register/i);
      expect(localstorageEmail).toEqual(null);
      expect(loginButton).toBeInTheDocument();
    });
  });
});
