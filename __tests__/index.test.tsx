import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders a heading", async () => {
  render(await Home());

  expect(screen.getByRole("heading")).toHaveTextContent("Home");
});
