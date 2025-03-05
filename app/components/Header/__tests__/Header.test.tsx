import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders the logo with correct alt text and size", () => {
    render(<Header />);

    const logo = screen.getByAltText("Gymondo Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "30");
    expect(logo).toHaveAttribute("height", "30");
  });

  it("contains a link that redirects to the homepage", () => {
    render(<Header />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
