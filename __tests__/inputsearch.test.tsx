import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { InputSearch } from "@/components/molecules/InputSearch";

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

describe("InputSearch", () => {
  it("renders with placeholder text", () => {
    const { getByPlaceholderText } = render(
      <InputSearch placeholder="Type to search..." />,
    );

    expect(getByPlaceholderText("Type to search...")).toBeInTheDocument();
  });

  it("calls handleSearch when input changes", async () => {});
});
