import { render, screen } from "@testing-library/react";
import PhoneCard from "./PhoneCard";
import { ProductList } from "@/types/products.types";
import React from "react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({
        fill,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || "phone"} />;
    },
}));

const mockPhone: ProductList = {
    id: "1",
    brand: "Apple",
    name: "iPhone 15",
    basePrice: 1000,
    imageUrl: "/test.jpg",
};

describe("PhoneCard Component", () => {
    it("should render phone details correctly", () => {
        render(<PhoneCard phone={mockPhone} />);

        expect(screen.getByText(/Apple/i)).toBeInTheDocument();
        expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();
        expect(screen.getByText(/1000 eur/i)).toBeInTheDocument();

        const img = screen.getByAltText(/iPhone 15/i);
        expect(img).toBeInTheDocument();
    });

    it("should link to the correct detail page", () => {
        render(<PhoneCard phone={mockPhone} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/phone/1");
    });
});
