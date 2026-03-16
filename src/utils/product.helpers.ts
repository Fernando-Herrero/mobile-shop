export const getImageScaleClass = (brand?: string, name?: string): string => {
    if (!name) return "";

    const brandLower = brand?.toLowerCase() || "";
    const modelLower = name.toLowerCase();

    if (
        brandLower === "xiaomi" ||
        modelLower.includes("redmi") ||
        modelLower === "14"
    ) {
        return "reduce-image-max";
    }

    if (brandLower === "realme" || modelLower.includes("note 50")) {
        return "reduce-image-medium";
    }

    if (
        brandLower === "oppo" ||
        modelLower.includes("oppo") ||
        modelLower.includes("reno")
    ) {
        return "reduce-image-small";
    }

    if (modelLower.includes("galaxy a35 5g")) {
        return "augment-image";
    }

    return "";
};
