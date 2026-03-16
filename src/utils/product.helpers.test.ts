import { getImageScaleClass } from "./product.helpers";

describe("getImageScaleClass Unit Tests", () => {
    it('should return "reduce-image-max" for Xiaomi models', () => {
        const result = getImageScaleClass("Xiaomi", "14");
        expect(result).toBe("reduce-image-max");
    });

    it('should return "reduce-image-small" for Oppo Reno models', () => {
        const result = getImageScaleClass("Oppo", "Reno 12");
        expect(result).toBe("reduce-image-small");
    });

    it('should return "reduce-image-medium" for Realme models', () => {
        const result = getImageScaleClass("Realme", "GT");
        expect(result).toBe("reduce-image-medium");
    });

    it("should return an empty string for Samsung or unknown brands", () => {
        const result = getImageScaleClass("Samsung", "S24");
        expect(result).toBe("");
    });

    it('should return "augment-image" for Galaxy A35 5G', () => {
        const result = getImageScaleClass("Samsung", "Galaxy A35 5G");
        expect(result).toBe("augment-image");
    });

    it("should return an empty string if name is not provided", () => {
        const result = getImageScaleClass("Xiaomi", undefined);
        expect(result).toBe("");
    });
});
