import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "./BackButton";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("BackButton Component", () => {
    it("should call router.back when clicked", () => {
        const mockBack = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

        render(<BackButton />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockBack).toHaveBeenCalledTimes(1);
    });
});
