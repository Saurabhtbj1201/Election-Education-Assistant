import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginButton } from "../src/components/login-button";

vi.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => vi.fn()
}));

describe("LoginButton", () => {
  it("renders sign in button when not logged in", () => {
    render(<LoginButton />);
    expect(screen.getByText(/Sign in with Google/i)).toBeDefined();
  });
});
